import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { BottomNav } from '@/components/layout/BottomNav';
import { VideoCompare } from '@/components/analysis/VideoCompare';
import { CueChecklist } from '@/components/analysis/CueChecklist';
import { ScoreRing } from '@/components/analysis/ScoreRing';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { exercises } from '@/data/exercises';
import { ArrowLeft, Upload, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Analyze = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const [checkedCues, setCheckedCues] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const exercise = exercises.find((e) => e.id === exerciseId);

  if (!exercise) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Exercise not found</p>
            <Button variant="outline" onClick={() => navigate('/library')}>
              Back to Library
            </Button>
          </div>
        </div>
        <BottomNav />
      </PageContainer>
    );
  }

  const handleToggleCue = (cueId: string) => {
    setCheckedCues((prev) =>
      prev.includes(cueId) ? prev.filter((id) => id !== cueId) : [...prev, cueId]
    );
  };

  const calculateScore = () => {
    // Weighted scoring
    let totalWeight = 0;
    let earnedWeight = 0;
    
    exercise.cues.forEach((cue) => {
      const weight = cue.weight || 1;
      totalWeight += weight;
      if (checkedCues.includes(cue.id)) {
        earnedWeight += weight;
      }
    });
    
    return Math.round((earnedWeight / totalWeight) * 100);
  };

  const score = calculateScore();
  const missedCues = exercise.cues.filter((cue) => !checkedCues.includes(cue.id));

  const handleSave = () => {
    toast.success('Analysis saved!', {
      description: `${exercise.name} - Score: ${score}%`,
    });
    setShowResults(false);
    setCheckedCues([]);
    navigate('/analytics');
  };

  if (showResults) {
    return (
      <PageContainer>
        <div className="px-4 pt-8 pb-4 space-y-6 animate-fade-in">
          {/* Header */}
          <header className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setShowResults(false)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Results</h1>
              <p className="text-sm text-muted-foreground">{exercise.name}</p>
            </div>
          </header>

          {/* Score Display */}
          <Card className="p-8 bg-card border-border/50 text-center">
            <ScoreRing score={score} size="lg" />
            <h2 className="text-2xl font-bold mt-4 text-foreground">
              {score >= 80 ? 'Great Work!' : score >= 60 ? 'Good Effort!' : 'Keep Practicing!'}
            </h2>
            <p className="text-muted-foreground mt-1">
              {checkedCues.length} of {exercise.cues.length} checkpoints passed
            </p>
          </Card>

          {/* Summary */}
          <div className="space-y-4">
            {/* Completed */}
            {checkedCues.length > 0 && (
              <Card className="p-4 bg-success/10 border-success/30">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <h3 className="font-semibold text-success">What You Nailed</h3>
                </div>
                <ul className="space-y-2">
                  {exercise.cues
                    .filter((cue) => checkedCues.includes(cue.id))
                    .map((cue) => (
                      <li key={cue.id} className="text-sm text-foreground">
                        • {cue.text}
                      </li>
                    ))}
                </ul>
              </Card>
            )}

            {/* Missed */}
            {missedCues.length > 0 && (
              <Card className="p-4 bg-destructive/10 border-destructive/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <h3 className="font-semibold text-destructive">Areas to Improve</h3>
                </div>
                <ul className="space-y-2">
                  {missedCues.map((cue) => (
                    <li key={cue.id} className="text-sm text-foreground">
                      • {cue.text}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowResults(false)}>
              Try Again
            </Button>
            <Button variant="hero" className="flex-1" onClick={handleSave}>
              <Save className="w-4 h-4" />
              Save Result
            </Button>
          </div>
        </div>
        <BottomNav />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="px-4 pt-8 pb-4 space-y-6 animate-fade-in">
        {/* Header */}
        <header className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/library')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{exercise.name}</h1>
            <p className="text-sm text-muted-foreground">Compare and assess your form</p>
          </div>
        </header>

        {/* Video Comparison */}
        <VideoCompare proVideoUrl={exercise.proVideoUrl} />

        {/* Upload Button */}
        <Button variant="outline" className="w-full">
          <Upload className="w-4 h-4" />
          Upload Your Video
        </Button>

        {/* Cue Checklist */}
        <CueChecklist
          cues={exercise.cues}
          checkedCues={checkedCues}
          onToggle={handleToggleCue}
        />

        {/* Live Score Preview */}
        <Card className="p-4 bg-card border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Score</p>
              <p className="text-2xl font-bold text-foreground">{score}%</p>
            </div>
            <Button 
              variant="glow"
              onClick={() => setShowResults(true)}
              disabled={checkedCues.length === 0}
            >
              Complete Analysis
            </Button>
          </div>
        </Card>
      </div>
      <BottomNav />
    </PageContainer>
  );
};

export default Analyze;
