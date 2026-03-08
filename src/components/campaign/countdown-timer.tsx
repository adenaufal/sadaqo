'use client';

import { useEffect, useState } from 'react';
import { getTimeRemaining } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endDate: string | null;
  compact?: boolean;
}

export function CountdownTimer({ endDate, compact = false }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeRemaining(endDate));

  useEffect(() => {
    if (!endDate) return;

    const interval = setInterval(() => {
      setTime(getTimeRemaining(endDate));
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [endDate]);

  if (!endDate) {
    return compact ? null : (
      <span className="text-xs text-muted-foreground">Tanpa batas waktu</span>
    );
  }

  if (time.expired) {
    return (
      <div className="flex items-center gap-1.5 text-red-500">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">Berakhir</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-xs">{time.text}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {[
        { value: time.days, label: 'Hari' },
        { value: time.hours, label: 'Jam' },
        { value: time.minutes, label: 'Menit' },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
            <span className="text-lg font-bold font-heading">{unit.value}</span>
          </div>
          <span className="text-xs text-muted-foreground mt-1">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
