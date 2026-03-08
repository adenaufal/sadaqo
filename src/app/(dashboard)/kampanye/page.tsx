import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { formatRupiah } from '@/lib/utils';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Megaphone, ExternalLink, Share2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kampanye',
};

export default async function KampanyePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false }) as { data: Campaign[] | null };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kampanye</h1>
          <p className="text-muted-foreground text-sm">Kelola semua kampanye donasi Anda</p>
        </div>
        <Button asChild className="gradient-emerald text-white">
          <Link href="/kampanye/buat">
            <Plus className="w-4 h-4 mr-1" />
            Buat Kampanye
          </Link>
        </Button>
      </div>

      {!campaigns || campaigns.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-emerald flex items-center justify-center mx-auto mb-4">
              <Megaphone className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-foreground/80 mb-1">Mulai kampanye pertama Anda 🌙</p>
            <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
              5 menit setup. Seumur hidup transparansi. Jamaah Anda menunggu cara yang lebih mudah untuk berdonasi.
            </p>
            <Button asChild className="gradient-emerald text-white">
              <Link href="/kampanye/buat">
                <Plus className="w-4 h-4 mr-1" />
                Buat Kampanye Pertama
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => {
            const progress = campaign.target_amount > 0
              ? Math.min(Math.round(((campaign.collected_amount || 0) / campaign.target_amount) * 100), 100)
              : 0;

            return (
              <Card key={campaign.id} className="border-border/50 overflow-hidden hover:shadow-md transition-shadow">
                {/* Cover Image placeholder */}
                <div className="h-32 gradient-emerald relative">
                  {campaign.cover_image_url ? (
                    <img src={campaign.cover_image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center islamic-pattern">
                      <Megaphone className="w-8 h-8 text-white/50" />
                    </div>
                  )}
                  <Badge className="absolute top-3 right-3 text-xs" variant={campaign.is_active ? 'default' : 'secondary'}>
                    {campaign.is_active ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                </div>

                <CardContent className="pt-4 space-y-3">
                  <div>
                    <h3 className="font-semibold font-heading text-sm truncate">{campaign.title}</h3>
                    <Badge variant="outline" className="text-xs mt-1">{campaign.campaign_type.replace('_', ' ')}</Badge>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        {formatRupiah(campaign.collected_amount || 0)}
                      </span>
                      <span className="font-semibold text-primary">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-emerald rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: {formatRupiah(campaign.target_amount)} &middot; {campaign.donor_count || 0} donatur
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1 text-xs">
                      <Link href={`/kampanye/${campaign.id}`}>Detail</Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="text-xs">
                      <Link href={`/campaign/${campaign.slug}`} target="_blank">
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
