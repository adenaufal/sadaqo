import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatRupiah, calculateProgress } from '@/lib/utils';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type Donation = Database['public']['Tables']['donations']['Row'];
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/campaign/progress-bar';
import { DonationTicker } from '@/components/campaign/donation-ticker';
import { DonorLeaderboard } from '@/components/donation/donor-leaderboard';
import { CountdownTimer } from '@/components/campaign/countdown-timer';
import { ShareButton } from '@/components/donation/share-button';
import { Heart, Users, Wallet, Clock, Megaphone } from 'lucide-react';
import Link from 'next/link';
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
    .select('title, description')
    .eq('slug', slug)
    .eq('is_active', true)
    .single() as { data: Pick<Campaign, 'title' | 'description'> | null };

  if (!campaign) return { title: 'Kampanye Tidak Ditemukan' };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    title: campaign.title,
    description: campaign.description || `Donasi untuk ${campaign.title}`,
    openGraph: {
      title: campaign.title,
      description: campaign.description || `Donasi untuk ${campaign.title}`,
      images: [`${appUrl}/api/og/${slug}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: campaign.title,
      description: campaign.description || `Donasi untuk ${campaign.title}`,
      images: [`${appUrl}/api/og/${slug}`],
    },
  };
}

export default async function PublicCampaignPage({
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

  // Fetch paid donations
  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .eq('campaign_id', campaign.id)
    .eq('payment_status', 'paid')
    .order('paid_at', { ascending: false })
    .limit(50) as { data: Donation[] | null };

  const progress = calculateProgress(campaign.collected_amount || 0, campaign.target_amount);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const campaignUrl = `${appUrl}/campaign/${campaign.slug}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative">
        <div className="h-48 sm:h-64 gradient-emerald relative overflow-hidden">
          {campaign.cover_image_url ? (
            <img
              src={campaign.cover_image_url}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 islamic-pattern" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-4 -mt-16 relative z-10">
          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <Badge variant="outline" className="text-xs mb-2">
                    {campaign.campaign_type.replace('_', ' ')}
                  </Badge>
                  <h1 className="text-xl sm:text-2xl font-bold font-heading">{campaign.title}</h1>
                </div>
                <ShareButton
                  campaignTitle={campaign.title}
                  campaignUrl={campaignUrl}
                  collected={campaign.collected_amount || 0}
                  target={campaign.target_amount}
                />
              </div>

              <ProgressBar
                collected={campaign.collected_amount || 0}
                target={campaign.target_amount}
                size="lg"
              />

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Wallet, label: 'Terkumpul', value: formatRupiah(campaign.collected_amount || 0) },
                  { icon: Users, label: 'Donatur', value: `${campaign.donor_count || 0} orang` },
                  { icon: Clock, label: 'Sisa Waktu', value: null, endDate: campaign.end_date },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-lg bg-muted/30">
                    <stat.icon className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    {stat.value ? (
                      <p className="text-sm font-bold font-heading mt-0.5">{stat.value}</p>
                    ) : (
                      <div className="mt-0.5 flex justify-center">
                        <CountdownTimer endDate={stat.endDate || null} compact />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button asChild className="w-full gradient-emerald text-white h-12 text-base font-semibold">
                <Link href={`/donate/${campaign.slug}`}>
                  <Heart className="w-5 h-5 mr-2" />
                  Donasi Sekarang
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Description */}
        {campaign.description && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-heading">Tentang Kampanye</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {campaign.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Beneficiary Story */}
        {campaign.beneficiary_story && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-heading">Cerita Penerima Manfaat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed italic">
                {campaign.beneficiary_story}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Real-time Donations */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              Donasi Terbaru
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DonationTicker campaignId={campaign.id} />
          </CardContent>
        </Card>

        {/* Donor Leaderboard */}
        {donations && donations.length > 0 && (
          <DonorLeaderboard donations={donations} />
        )}

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
