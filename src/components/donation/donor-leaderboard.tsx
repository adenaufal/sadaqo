'use client';

import { formatRupiah } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, User } from 'lucide-react';
import type { Database } from '@/types/database';

type Donation = Database['public']['Tables']['donations']['Row'];

interface DonorLeaderboardProps {
  donations: Donation[];
  maxItems?: number;
}

export function DonorLeaderboard({ donations, maxItems = 10 }: DonorLeaderboardProps) {
  // Aggregate by donor name and sort by total
  const aggregated = donations.reduce<Record<string, { name: string; total: number; count: number }>>(
    (acc, d) => {
      const name = d.is_anonymous ? 'Hamba Allah' : d.donor_name;
      if (!acc[name]) {
        acc[name] = { name, total: 0, count: 0 };
      }
      acc[name].total += d.amount;
      acc[name].count += 1;
      return acc;
    },
    {}
  );

  const sorted = Object.values(aggregated)
    .sort((a, b) => b.total - a.total)
    .slice(0, maxItems);

  if (sorted.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="py-8 text-center text-muted-foreground">
          Belum ada donatur
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-heading flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          Donatur Teratas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sorted.map((donor, idx) => (
          <div
            key={donor.name + idx}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
              {idx < 3 ? ['🥇', '🥈', '🥉'][idx] : idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate flex items-center gap-1.5">
                {donor.name === 'Hamba Allah' && <User className="w-3 h-3 text-muted-foreground" />}
                {donor.name}
              </p>
              <p className="text-xs text-muted-foreground">{donor.count}x donasi</p>
            </div>
            <span className="text-sm font-bold text-primary shrink-0">
              {formatRupiah(donor.total)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
