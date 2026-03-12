import { ImageResponse } from 'next/og';
import { createClient } from '@/lib/supabase/server';
import { formatRupiah, calculateProgress } from '@/lib/utils';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const supabase = await createClient();
    const { data: campaign } = await supabase
      .from('campaigns')
      .select('title, campaign_type, target_amount, collected_amount, donor_count')
      .eq('slug', slug)
      .eq('is_active', true)
      .single() as { data: Pick<Campaign, 'title' | 'campaign_type' | 'target_amount' | 'collected_amount' | 'donor_count'> | null };

    if (!campaign) {
      return new ImageResponse(
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #065f46, #047857, #10b981)',
              color: 'white',
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            Sadaqo
          </div>
        ),
        { width: 1200, height: 630 }
      );
    }

    const progress = calculateProgress(campaign.collected_amount || 0, campaign.target_amount);

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px',
            background: 'linear-gradient(135deg, #065f46, #047857, #10b981)',
            color: 'white',
          }}
        >
          {/* Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '20px',
              }}
            >
              {campaign.campaign_type.replace('_', ' ')}
            </div>
          </div>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '52px', fontWeight: 700, lineHeight: 1.2 }}>
              {campaign.title}
            </div>

            {/* Progress bar */}
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '16px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: '#fbbf24',
                  borderRadius: '8px',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px' }}>
              <span>{formatRupiah(campaign.collected_amount || 0)} terkumpul</span>
              <span style={{ opacity: 0.8 }}>{progress}%</span>
            </div>
          </div>

          {/* Bottom */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '20px',
            }}
          >
            <div style={{ display: 'flex', gap: '24px', opacity: 0.9 }}>
              <span>Target: {formatRupiah(campaign.target_amount)}</span>
              <span>{campaign.donor_count || 0} donatur</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>Sadaqo</div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #065f46, #047857, #10b981)',
            color: 'white',
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Sadaqo
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
