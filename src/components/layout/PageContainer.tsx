import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("min-h-screen pb-20 bg-background", className)}>
      {children}
    </main>
  );
}
