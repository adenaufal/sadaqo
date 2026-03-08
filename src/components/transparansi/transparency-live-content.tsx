'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRealtimeDonations } from '@/hooks/use-realtime-donations';
import { formatRupiah, calculateProgress } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProgressBar } from '@/components/campaign/progress-bar';
import { DonorLeaderboard } from '@/components/donation/donor-leaderboard';
import { Wallet, Users, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type Donation = Database['public']['Tables']['donations']['Row'];

interface TransparencyLiveContentProps {
  campaignId: string;
  initialCampaign: Campaign;
  initialDonations: Donation[];
}

export function TransparencyLiveContent({
  campaignId,
  initialCampaign,
  initialDonations,
}: TransparencyLiveContentProps) {
  const [campaign, setCampaign] = useState<Campaign>(initialCampaign);
  const { donations, loading: donationsLoading } = useRealtimeDonations(campaignId);

  // Subscribe to campaign stats updates (collected_amount, donor_count)
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`campaign-stats-${campaignId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'campaigns',
          filter: `id=eq.${campaignId}`,
        },
        (payload) => {
          setCampaign(payload.new as Campaign);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [campaignId]);

  // Use live donations if loaded, else fall back to server-fetched initial data
  const activeDonations = !donationsLoading ? donations : initialDonations;

  const progress = calculateProgress(campaign.collected_amount || 0, campaign.target_amount);

  const typeStats = useMemo(
    () =>
      activeDonations.reduce<Record<string, { count: number; total: number }>>((acc, d) => {
        if (!acc[d.donation_type]) acc[d.donation_type] = { count: 0, total: 0 };
        acc[d.donation_type].count += 1;
        acc[d.donation_type].total += d.amount;
        return acc;
      }, {}),
    [activeDonations]
  );

  return (
    <div className="space-y-6">
      {/* Overview stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Terkumpul', value: formatRupiah(campaign.collected_amount || 0), icon: Wallet, color: 'text-primary' },
          { label: 'Jumlah Donatur', value: `${campaign.donor_count || 0} orang`, icon: Users, color: 'text-blue-600' },
          { label: 'Progres', value: `${progress}%`, icon: TrendingUp, color: 'text-emerald-600' },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
              <p className="text-lg font-bold font-heading">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <ProgressBar
            collected={campaign.collected_amount || 0}
            target={campaign.target_amount}
            size="lg"
          />
        </CardContent>
      </Card>

      {/* Breakdown by type */}
      {Object.keys(typeStats).length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Rincian per Jenis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(typeStats).map(([type, stat]) => (
                <div key={type} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <Badge variant="outline" className="text-xs">{type.replace('_', ' ')}</Badge>
                    <span className="text-xs text-muted-foreground ml-2">{stat.count} donasi</span>
                  </div>
                  <span className="font-bold text-sm">{formatRupiah(stat.total)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Donor leaderboard */}
      {activeDonations.length > 0 && (
        <DonorLeaderboard donations={activeDonations} maxItems={20} />
      )}

      {/* Full transaction log */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-heading">
            Riwayat Donasi Lengkap
            <span className="relative ml-2 inline-flex h-2 w-2 align-middle">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeDonations.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Belum ada donasi</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donatur</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeDonations.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="text-sm">
                        {d.is_anonymous ? 'Hamba Allah' : d.donor_name}
                      </TableCell>
                      <TableCell className="font-medium text-sm">{formatRupiah(d.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {d.donation_type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {d.paid_at
                          ? format(new Date(d.paid_at), 'dd MMM yyyy', { locale: idLocale })
                          : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
