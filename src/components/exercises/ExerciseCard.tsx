import { Exercise } from '@/data/exercises';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
  className?: string;
}

export function ExerciseCard({ exercise, onClick, className }: ExerciseCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group cursor-pointer overflow-hidden bg-card hover:bg-secondary/50 border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Dumbbell className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {exercise.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
              {exercise.muscleGroup}
            </Badge>
            <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">
              {exercise.movementPattern}
            </Badge>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Card>
  );
}
