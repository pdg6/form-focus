import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExerciseFiltersProps {
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
  label: string;
}

export function ExerciseFilters({ options, selected, onSelect, label }: ExerciseFiltersProps) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selected === null ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(null)}
          className="rounded-full"
        >
          All
        </Button>
        {options.map((option) => (
          <Button
            key={option}
            variant={selected === option ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(option)}
            className="rounded-full"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
