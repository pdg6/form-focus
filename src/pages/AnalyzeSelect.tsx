import { PageContainer } from '@/components/layout/PageContainer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Library } from 'lucide-react';

const AnalyzeSelect = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="px-4 pt-8 pb-4 space-y-6 animate-fade-in flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
            <Library className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Start Analysis</h1>
          <p className="text-muted-foreground max-w-xs">
            Select an exercise from the library to begin your form analysis
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate('/library')}>
            Browse Exercises
          </Button>
        </div>
      </div>
      <BottomNav />
    </PageContainer>
  );
};

export default AnalyzeSelect;
