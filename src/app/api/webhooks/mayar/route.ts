import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { MayarWebhookPayload } from '@/types/mayar';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const payload: MayarWebhookPayload = await req.json();
    const { event, data } = payload;

    if (event === 'payment.received') {
      // 1. Update donation status
      const { data: donation, error } = await (supabase
        .from('donations') as any)
        .update({
          payment_status: 'paid',
          paid_at: data.paidAt || new Date().toISOString(),
          mayar_transaction_id: data.transactionId,
        })
        .eq('mayar_transaction_id', data.transactionId)
        .select('campaign_id, amount')
        .single();

      if (error) {
        console.error('Webhook DB error:', error);
        throw error;
      }

      // 2. Update campaign stats (collected_amount + donor_count)
      if (donation) {
        await (supabase.rpc as any)('increment_campaign_stats', {
          p_campaign_id: donation.campaign_id,
          p_amount: donation.amount,
        });
      }
    } else if (event === 'payment.failed') {
      await (supabase
        .from('donations') as any)
        .update({ payment_status: 'failed' })
        .eq('mayar_transaction_id', data.transactionId);
    } else if (event === 'payment.expired') {
      await (supabase
        .from('donations') as any)
        .update({ payment_status: 'expired' })
        .eq('mayar_transaction_id', data.transactionId);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
