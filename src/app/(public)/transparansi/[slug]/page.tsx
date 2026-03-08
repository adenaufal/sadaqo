import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatRupiah, calculateProgress } from '@/lib/utils';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type Donation = Database['public']['Tables']['donations']['Row'];
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProgressBar } from '@/components/campaign/progress-bar';
import { DonorLeaderboard } from '@/components/donation/donor-leaderboard';
import { ShareButton } from '@/components/donation/share-button';
import {
  Shield,
  Wallet,
  Users,
  TrendingUp,
  Heart,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: campaign } = await supabase
    .from('campaigns')
    .select('title')
    .eq('slug', slug)
    .eq('is_active', true)
    .single() as { data: Pick<Campaign, 'title'> | null };

  return {
    title: campaign ? `Transparansi — ${campaign.title}` : 'Transparansi',
  };
}

export default async function TransparansiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single() as { data: Campaign | null };

  if (!campaign) notFound();

  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .eq('campaign_id', campaign.id)
    .eq('payment_status', 'paid')
    .order('paid_at', { ascending: false }) as { data: Donation[] | null };

  const progress = calculateProgress(campaign.collected_amount || 0, campaign.target_amount);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const campaignUrl = `${appUrl}/campaign/${campaign.slug}`;

  // Stats by type
  const typeStats = (donations || []).reduce<Record<string, { count: number; total: number }>>(
    (acc, d) => {
      if (!acc[d.donation_type]) acc[d.donation_type] = { count: 0, total: 0 };
      acc[d.donation_type].count += 1;
      acc[d.donation_type].total += d.amount;
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon">
              <Link href={`/campaign/${campaign.slug}`}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-emerald-600" />
                <h1 className="text-lg font-bold font-heading">Laporan Transparansi</h1>
              </div>
              <p className="text-sm text-muted-foreground truncate">{campaign.title}</p>
            </div>
            <ShareButton
              campaignTitle={campaign.title}
              campaignUrl={`${campaignUrl}?tab=transparansi`}
              collected={campaign.collected_amount || 0}
              target={campaign.target_amount}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Overview */}
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

        {/* Progress */}
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <ProgressBar
              collected={campaign.collected_amount || 0}
              target={campaign.target_amount}
              size="lg"
            />
          </CardContent>
        </Card>

        {/* Breakdown by Type */}
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

        {/* Donor Leaderboard */}
        {donations && donations.length > 0 && (
          <DonorLeaderboard donations={donations} maxItems={20} />
        )}

        {/* Full Transaction Log */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Riwayat Donasi Lengkap</CardTitle>
          </CardHeader>
          <CardContent>
            {!donations || donations.length === 0 ? (
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
                    {donations.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="text-sm">
                          {d.is_anonymous ? 'Hamba Allah' : d.donor_name}
                        </TableCell>
                        <TableCell className="font-medium text-sm">
                          {formatRupiah(d.amount)}
                        </TableCell>
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

        {/* Bottom CTA (desktop) */}
        <div className="hidden sm:block text-center space-y-3 pt-2 pb-8">
          <Button asChild className="gradient-emerald text-white h-11 px-6">
            <Link href={`/donate/${campaign.slug}`}>
              <Heart className="w-4 h-4 mr-2" />
              Donasi Sekarang
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Data diperbarui secara real-time &middot; Powered by ZakatFlow
          </p>
        </div>

        {/* Spacer for mobile sticky bar */}
        <div className="h-20 sm:hidden" />
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden bg-background/95 backdrop-blur-lg border-t border-border/50 px-4 py-3 safe-area-bottom">
        <Button asChild className="w-full gradient-emerald text-white h-12 text-base font-semibold shadow-lg">
          <Link href={`/donate/${campaign.slug}`}>
            <Heart className="w-5 h-5 mr-2" />
            Donasi Sekarang
          </Link>
        </Button>
      </div>
    </div>
  );
}
