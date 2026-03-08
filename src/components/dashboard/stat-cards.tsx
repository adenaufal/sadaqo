'use client';

import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { CountUp } from '@/components/ui/count-up';
import { formatRupiah, formatNumber } from '@/lib/utils';
import { Wallet, Users, Megaphone, TrendingUp, type LucideIcon } from 'lucide-react';

const ease = [0.25, 1, 0.5, 1] as const;

interface StatCardsProps {
  totalCollected: number;
  totalDonors: number;
  activeCampaigns: number;
  avgDonation: number;
}

const iconMap: Record<string, { icon: LucideIcon; color: string; bgColor: string }> = {
  collected: { icon: Wallet, color: 'text-primary', bgColor: 'bg-primary/10' },
  donors: { icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  campaigns: { icon: Megaphone, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  average: { icon: TrendingUp, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
};

export function StatCards({ totalCollected, totalDonors, activeCampaigns, avgDonation }: StatCardsProps) {
  const stats = [
    {
      key: 'collected',
      label: 'Total Terkumpul',
      rawValue: totalCollected,
      formatter: (v: number) => formatRupiah(v),
    },
    {
      key: 'donors',
      label: 'Total Donatur',
      rawValue: totalDonors,
      formatter: (v: number) => formatNumber(v),
    },
    {
      key: 'campaigns',
      label: 'Kampanye Aktif',
      rawValue: activeCampaigns,
      formatter: (v: number) => v.toString(),
    },
    {
      key: 'average',
      label: 'Rata-rata Donasi',
      rawValue: avgDonation,
      formatter: (v: number) => formatRupiah(v),
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const { icon: Icon, color, bgColor } = iconMap[stat.key];
        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.07, ease }}
          >
            <Card className="border-border/50 h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-bold font-heading">
                      <CountUp end={stat.rawValue} formatter={stat.formatter} />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
