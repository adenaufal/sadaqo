import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type Donation = Database['public']['Tables']['donations']['Row'];
import { Button } from '@/components/ui/button';
import { TransparencyLiveContent } from '@/components/transparansi/transparency-live-content';
import { ShareButton } from '@/components/donation/share-button';
import {
  Shield,
  Heart,
  ArrowLeft,
} from 'lucide-react';
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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const campaignUrl = `${appUrl}/campaign/${campaign.slug}`;

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
        <TransparencyLiveContent
          campaignId={campaign.id}
          initialCampaign={campaign}
          initialDonations={donations || []}
        />
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
