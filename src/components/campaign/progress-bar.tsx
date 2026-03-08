'use client';

import { useEffect, useState } from 'react';
import { formatRupiah, formatCompactNumber, calculateProgress } from '@/lib/utils';

interface ProgressBarProps {
  collected: number;
  target: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function ProgressBar({
  collected,
  target,
  showLabels = true,
  size = 'md',
  animate = true,
}: ProgressBarProps) {
  const [width, setWidth] = useState(animate ? 0 : calculateProgress(collected, target));
  const progress = calculateProgress(collected, target);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setWidth(progress), 100);
      return () => clearTimeout(timer);
    }
  }, [progress, animate]);

  const heights = { sm: 'h-1.5', md: 'h-3', lg: 'h-4' };

  return (
    <div className="space-y-1.5">
      {showLabels && (
        <div className="flex justify-between text-sm">
          <span className="font-bold text-primary">{formatRupiah(collected)}</span>
          <span className="text-muted-foreground">dari {formatRupiah(target)}</span>
        </div>
      )}
      <div className={`${heights[size]} bg-muted rounded-full overflow-hidden`}>
        <div
          className="h-full gradient-emerald rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animate ? width : progress}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{progress}% tercapai</span>
        </div>
      )}
    </div>
  );
}
