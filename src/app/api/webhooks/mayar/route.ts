import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { MayarWebhookPayload } from '@/types/mayar';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    const payload: MayarWebhookPayload = await req.json();
    const { event, data } = payload;

    console.log('[Webhook] Event:', event, '| data.id:', data?.id, '| data.transactionId:', data?.transactionId);

    if (event === 'payment.received') {
      // matchIds: try all possible IDs Mayar might send
      const matchIds = [data.id, data.transactionId].filter(Boolean);
      console.log('[Webhook] Matching against mayar_transaction_id in:', matchIds);

      const { data: updated, error } = await (supabase
        .from('donations') as any)
        .update({
          payment_status: 'paid',
          paid_at: data.paidAt || new Date().toISOString(),
          mayar_transaction_id: data.transactionId || data.id,
        })
        .in('mayar_transaction_id', matchIds)
        .neq('payment_status', 'paid') // idempotency: skip if already paid
        .select('id, campaign_id');

      if (error) {
        console.error('[Webhook] DB error:', error);
        throw error;
      }

      console.log('[Webhook] Updated donations:', updated?.length ?? 0, updated);
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
    console.error('[Webhook] Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
