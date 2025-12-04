import { PageContainer } from '@/components/layout/PageContainer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScoreRing } from '@/components/analysis/ScoreRing';
import { exercises, userHistory } from '@/data/exercises';
import { Play, TrendingUp, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Index = () => {
  const navigate = useNavigate();
  
  // Calculate overall stats
  const recentLogs = userHistory.slice(0, 5);
  const avgScore = Math.round(userHistory.reduce((acc, log) => acc + log.score, 0) / userHistory.length);
  const latestScore = userHistory[0]?.score || 0;
  
  const getExerciseName = (exerciseId: string) => {
    return exercises.find(e => e.id === exerciseId)?.name || exerciseId;
  };

  return (
    <PageContainer>
      <div className="px-4 pt-8 pb-4 space-y-8 animate-fade-in">
        {/* Hero Section */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">BioForm</span>
          </h1>
          <p className="text-muted-foreground">
            Master your movement mechanics
          </p>
        </header>

        {/* Quick Stats */}
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <ScoreRing score={avgScore} size="lg" />
            <p className="text-sm text-muted-foreground mt-2">Overall Score</p>
          </div>
        </div>

        {/* Quick Action */}
        <Button 
          variant="hero" 
          size="xl" 
          className="w-full"
          onClick={() => navigate('/library')}
        >
          <Play className="w-5 h-5" />
          Start New Analysis
        </Button>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 bg-card border-border/50 text-center">
            <Target className="w-5 h-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{userHistory.length}</p>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </Card>
          <Card className="p-4 bg-card border-border/50 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-success" />
            <p className="text-2xl font-bold text-foreground">+{latestScore - (userHistory[1]?.score || 0)}%</p>
            <p className="text-xs text-muted-foreground">Progress</p>
          </Card>
          <Card className="p-4 bg-card border-border/50 text-center">
            <Zap className="w-5 h-5 mx-auto mb-2 text-warning" />
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </Card>
        </div>

        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')}>
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <Card 
                key={log.id} 
                className="p-4 bg-card border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{getExerciseName(log.exerciseId)}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(log.timestamp), 'MMM d, yyyy')}
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

export default Index;
