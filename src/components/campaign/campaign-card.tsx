import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRupiah, calculateProgress } from '@/lib/utils';
import { Megaphone, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];

interface CampaignCardProps {
  campaign: Campaign;
  showActions?: boolean;
  linkPrefix?: string;
}

export function CampaignCard({ campaign, showActions = true, linkPrefix = '/kampanye' }: CampaignCardProps) {
  const progress = calculateProgress(campaign.collected_amount || 0, campaign.target_amount);

  return (
    <Card className="border-border/50 overflow-hidden hover:shadow-md transition-shadow">
      {/* Cover */}
      <div className="h-32 gradient-emerald relative">
        {campaign.cover_image_url ? (
          <img src={campaign.cover_image_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center islamic-pattern">
            <Megaphone className="w-8 h-8 text-white/50" />
          </div>
        )}
        <Badge
          className="absolute top-3 right-3 text-xs"
          variant={campaign.is_active ? 'default' : 'secondary'}
        >
          {campaign.is_active ? 'Aktif' : 'Nonaktif'}
        </Badge>
      </div>

      <CardContent className="pt-4 space-y-3">
        <div>
          <h3 className="font-semibold font-heading text-sm truncate">{campaign.title}</h3>
          <Badge variant="outline" className="text-xs mt-1">
            {campaign.campaign_type.replace('_', ' ')}
          </Badge>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">{formatRupiah(campaign.collected_amount || 0)}</span>
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

        {showActions && (
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1 text-xs">
              <Link href={`${linkPrefix}/${campaign.id}`}>Detail</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link href={`/campaign/${campaign.slug}`} target="_blank">
                <ExternalLink className="w-3 h-3" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
