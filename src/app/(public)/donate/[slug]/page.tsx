import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatRupiah, calculateProgress } from '@/lib/utils';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/campaign/progress-bar';
import { DonationForm } from '@/components/donation/donation-form';
import { ZakatCalculator } from '@/components/zakat/zakat-calculator';
import { ArrowLeft, Megaphone } from 'lucide-react';
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
    title: campaign ? `Donasi — ${campaign.title}` : 'Donasi',
  };
}

export default async function DonatePage({
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

  const progress = calculateProgress(campaign.collected_amount || 0, campaign.target_amount);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="shrink-0">
            <Link href={`/campaign/${campaign.slug}`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{campaign.title}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {campaign.campaign_type.replace('_', ' ')}
              </Badge>
              <span>{progress}% tercapai</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Mini Progress */}
        <Card className="border-border/50">
          <CardContent className="pt-4 pb-4">
            <ProgressBar
              collected={campaign.collected_amount || 0}
              target={campaign.target_amount}
              size="sm"
            />
          </CardContent>
        </Card>

        {/* Donation Form */}
        <DonationForm
          campaignId={campaign.id}
          campaignSlug={campaign.slug}
          campaignTitle={campaign.title}
          defaultType={campaign.campaign_type}
        />

        {/* Zakat Calculator (collapsible) */}
        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-primary hover:underline list-none flex items-center gap-2">
            <span className="group-open:rotate-90 transition-transform">&#9654;</span>
            Butuh hitung zakat dulu?
          </summary>
          <div className="mt-4">
            <ZakatCalculator showPayButton={false} />
          </div>
        </details>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Pembayaran diproses secara aman melalui{' '}
          <a href="https://mayar.id" target="_blank" rel="noopener" className="underline hover:text-primary">
            Mayar
          </a>
        </p>
      </div>
    </div>
  );
}
