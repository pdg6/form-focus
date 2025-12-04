import { useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/card';
import { ScoreRing } from '@/components/analysis/ScoreRing';
import { RadarChart } from '@/components/analytics/RadarChart';
import { TrendChart } from '@/components/analytics/TrendChart';
import { exercises, userHistory, movementPatterns } from '@/data/exercises';
import { format } from 'date-fns';
import { AlertTriangle } from 'lucide-react';

const Analytics = () => {
  // Calculate pattern scores for radar chart
  const patternScores = useMemo(() => {
    return movementPatterns.map((pattern) => {
      const patternExercises = exercises.filter((e) => e.movementPattern === pattern);
      const patternLogs = userHistory.filter((log) =>
        patternExercises.some((e) => e.id === log.exerciseId)
      );
      const avgScore = patternLogs.length
        ? Math.round(patternLogs.reduce((acc, log) => acc + log.score, 0) / patternLogs.length)
        : 0;
      return { pattern, score: avgScore };
    });
  }, []);

  // Calculate trend data for squat (most logged exercise)
  const trendData = useMemo(() => {
    const squatLogs = userHistory
      .filter((log) => log.exerciseId === 'squat_bb')
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map((log) => ({
        date: format(new Date(log.timestamp), 'MMM d'),
        score: log.score,
      }));
    return squatLogs;
  }, []);

  // Find most missed cue
  const weaknessAnalysis = useMemo(() => {
    const cueMissCount: Record<string, { count: number; text: string; exercise: string }> = {};
    
    userHistory.forEach((log) => {
      const exercise = exercises.find((e) => e.id === log.exerciseId);
      if (exercise) {
        log.missedCues.forEach((cueId) => {
          const cue = exercise.cues.find((c) => c.id === cueId);
          if (cue) {
            const key = `${log.exerciseId}-${cueId}`;
            if (!cueMissCount[key]) {
              cueMissCount[key] = { count: 0, text: cue.text, exercise: exercise.name };
            }
            cueMissCount[key].count++;
          }
        });
      }
    });

    const sorted = Object.values(cueMissCount).sort((a, b) => b.count - a.count);
    return sorted[0] || null;
  }, []);

  const getExerciseName = (exerciseId: string) => {
    return exercises.find((e) => e.id === exerciseId)?.name || exerciseId;
  };

  return (
    <PageContainer>
      <div className="px-4 pt-8 pb-4 space-y-6 animate-fade-in">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your biomechanics progress</p>
        </header>

        {/* Movement Balance Radar */}
        <Card className="p-4 bg-card border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Movement Balance</h2>
          <RadarChart data={patternScores} />
        </Card>

        {/* Trend Chart */}
        {trendData.length > 1 && (
          <Card className="p-4 bg-card border-border/50">
            <h2 className="text-lg font-semibold text-foreground mb-2">Squat Progress</h2>
            <p className="text-sm text-muted-foreground mb-4">Score trend over time</p>
            <TrendChart data={trendData} />
          </Card>
        )}

        {/* Weakness Identification */}
        {weaknessAnalysis && (
          <Card className="p-4 bg-warning/10 border-warning/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-semibold text-warning">Focus Area</h3>
                <p className="text-sm text-foreground mt-1">
                  "{weaknessAnalysis.text}" was missed {weaknessAnalysis.count} times in your {weaknessAnalysis.exercise} sessions.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* History List */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Session History</h2>
          <div className="space-y-3">
            {userHistory.map((log) => (
              <Card
                key={log.id}
                className="p-4 bg-card border-border/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{getExerciseName(log.exerciseId)}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(log.timestamp), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {log.completedCues.length} of {log.completedCues.length + log.missedCues.length} checkpoints
                    </p>
                  </div>
                  <ScoreRing score={log.score} size="sm" />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </PageContainer>
  );
};

export default Analytics;
