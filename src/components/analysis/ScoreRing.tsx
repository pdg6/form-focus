import { cn } from '@/lib/utils';

interface ScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ScoreRing({ score, size = 'md', className }: ScoreRingProps) {
  const sizeConfig = {
    sm: { dimension: 60, stroke: 4, fontSize: 'text-lg' },
    md: { dimension: 100, stroke: 6, fontSize: 'text-2xl' },
    lg: { dimension: 160, stroke: 8, fontSize: 'text-4xl' },
  };

  const config = sizeConfig[size];
  const radius = (config.dimension - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return 'text-success stroke-success';
    if (score >= 60) return 'text-warning stroke-warning';
    return 'text-destructive stroke-destructive';
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={config.dimension}
        height={config.dimension}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={config.stroke}
        />
        {/* Score ring */}
        <circle
          cx={config.dimension / 2}
          cy={config.dimension / 2}
          r={radius}
          fill="none"
          className={cn("transition-all duration-1000 ease-out", getScoreColor())}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={cn("absolute font-bold", config.fontSize, getScoreColor().split(' ')[0])}>
        {score}%
      </span>
    </div>
  );
}
