import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { formatRupiah, formatNumber } from '@/lib/utils';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCards } from '@/components/dashboard/stat-cards';
import {
  Megaphone,
  ArrowRight,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Fetch campaigns
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false }) as { data: Campaign[] | null };

  const totalCollected = campaigns?.reduce((sum, c) => sum + (c.collected_amount || 0), 0) || 0;
  const totalDonors = campaigns?.reduce((sum, c) => sum + (c.donor_count || 0), 0) || 0;
  const activeCampaigns = campaigns?.filter((c) => c.is_active).length || 0;

  const avgDonation = totalDonors > 0 ? Math.round(totalCollected / totalDonors) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Selamat datang kembali!</p>
        </div>
        <Button asChild className="gradient-emerald text-white">
          <Link href="/kampanye/buat">
            <Plus className="w-4 h-4 mr-1" />
            Buat Kampanye
          </Link>
        </Button>
      </div>

      {/* Stat Cards with count-up animation */}
      <StatCards
        totalCollected={totalCollected}
        totalDonors={totalDonors}
        activeCampaigns={activeCampaigns}
        avgDonation={avgDonation}
      />

      {/* Campaign List */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-heading">Kampanye Terbaru</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/kampanye">
              Lihat Semua
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {!campaigns || campaigns.length === 0 ? (
            <div className="text-center py-12">
              <Megaphone className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Belum ada kampanye</p>
              <Button asChild className="gradient-emerald text-white">
                <Link href="/kampanye/buat">
                  <Plus className="w-4 h-4 mr-1" />
                  Buat Kampanye Pertama
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.slice(0, 5).map((campaign) => {
                const progress = campaign.target_amount > 0
                  ? Math.min(Math.round(((campaign.collected_amount || 0) / campaign.target_amount) * 100), 100)
                  : 0;

                return (
                  <Link
                    key={campaign.id}
                    href={`/kampanye/${campaign.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/20 hover:bg-muted/30 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm truncate">{campaign.title}</p>
                        <Badge variant={campaign.is_active ? 'default' : 'secondary'} className="text-xs shrink-0">
                          {campaign.is_active ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{formatRupiah(campaign.collected_amount || 0)} / {formatRupiah(campaign.target_amount)}</span>
                        <span>{campaign.donor_count || 0} donatur</span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-emerald rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-primary shrink-0">{progress}%</span>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
