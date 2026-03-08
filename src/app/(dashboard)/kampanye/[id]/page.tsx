import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { formatRupiah, calculateProgress } from '@/lib/utils';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type Donation = Database['public']['Tables']['donations']['Row'];
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  Copy,
  Wallet,
  Users,
  TrendingUp,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { ShareButton } from '@/components/donation/share-button';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single() as { data: Campaign | null };

  if (!campaign) notFound();

  // Fetch donations for this campaign
  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .eq('campaign_id', campaign.id)
    .order('created_at', { ascending: false })
    .limit(20) as { data: Donation[] | null };

  const progress = calculateProgress(campaign.collected_amount || 0, campaign.target_amount);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const campaignUrl = `${appUrl}/campaign/${campaign.slug}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/kampanye">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold font-heading truncate">{campaign.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              {campaign.campaign_type.replace('_', ' ')}
            </Badge>
            <Badge variant={campaign.is_active ? 'default' : 'secondary'} className="text-xs">
              {campaign.is_active ? 'Aktif' : 'Nonaktif'}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button asChild variant="outline" size="sm">
            <Link href={`/campaign/${campaign.slug}`} target="_blank">
              <ExternalLink className="w-4 h-4 mr-1" />
              Lihat
            </Link>
          </Button>
          <ShareButton
            campaignTitle={campaign.title}
            campaignUrl={campaignUrl}
            collected={campaign.collected_amount || 0}
            target={campaign.target_amount}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'Terkumpul', value: formatRupiah(campaign.collected_amount || 0), icon: Wallet, color: 'text-primary' },
          { label: 'Target', value: formatRupiah(campaign.target_amount), icon: TrendingUp, color: 'text-blue-600' },
          { label: 'Donatur', value: (campaign.donor_count || 0).toString(), icon: Users, color: 'text-amber-600' },
          { label: 'Progres', value: `${progress}%`, icon: Clock, color: 'text-emerald-600' },
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

      {/* Progress Bar */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progres Kampanye</span>
            <span className="font-bold text-primary">{progress}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-emerald rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Donation History */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-heading">Riwayat Donasi</CardTitle>
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
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">
                        {donation.is_anonymous ? 'Hamba Allah' : donation.donor_name}
                      </TableCell>
                      <TableCell>{formatRupiah(donation.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {donation.donation_type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={donation.payment_status === 'paid' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {donation.payment_status === 'paid' ? 'Lunas' : donation.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {donation.created_at
                          ? format(new Date(donation.created_at), 'dd MMM yyyy HH:mm', { locale: idLocale })
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
