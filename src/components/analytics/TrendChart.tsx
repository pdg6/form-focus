import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface TrendChartProps {
  data: { date: string; score: number }[];
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))',
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0 }}
            activeDot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: 'hsl(var(--background))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
