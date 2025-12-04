import { Cue } from '@/data/exercises';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Shield, Activity, Expand } from 'lucide-react';

interface CueChecklistProps {
  cues: Cue[];
  checkedCues: string[];
  onToggle: (cueId: string) => void;
}

const categoryIcons = {
  safety: Shield,
  stability: Activity,
  mobility: Expand,
};

const categoryColors = {
  safety: 'bg-destructive/20 text-destructive border-destructive/30',
  stability: 'bg-primary/20 text-primary border-primary/30',
  mobility: 'bg-success/20 text-success border-success/30',
};

export function CueChecklist({ cues, checkedCues, onToggle }: CueChecklistProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Form Checkpoints
      </h3>
      <div className="space-y-2">
        {cues.map((cue) => {
          const Icon = categoryIcons[cue.category];
          const isChecked = checkedCues.includes(cue.id);
          
          return (
            <div
              key={cue.id}
              onClick={() => onToggle(cue.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200",
                isChecked
                  ? "bg-success/10 border-success/30"
                  : "bg-card border-border hover:border-primary/30 hover:bg-secondary/50"
              )}
            >
              <Checkbox
                checked={isChecked}
                className={cn(
                  "border-2 data-[state=checked]:bg-success data-[state=checked]:border-success"
                )}
              />
              <div className="flex-1">
                <p className={cn(
                  "font-medium transition-colors",
                  isChecked ? "text-success" : "text-foreground"
                )}>
                  {cue.text}
                </p>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs capitalize gap-1",
                  categoryColors[cue.category]
                )}
              >
                <Icon className="w-3 h-3" />
                {cue.category}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}
