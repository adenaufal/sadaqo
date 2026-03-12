import { NextRequest, NextResponse } from 'next/server';
import { createPaymentLink } from '@/lib/mayar';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

type Donation = Database['public']['Tables']['donations']['Row'];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { campaignId, campaignSlug, donorName, donorEmail, donorPhone, amount, donationType, isAnonymous, message } = body;
    const campaignTitle = body.campaignTitle || 'Kampanye Sadaqo';

    if (!campaignId || !donorName || !amount) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Create payment link via Mayar
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    let mayarResponse;
    try {
      mayarResponse = await createPaymentLink({
        name: donorName,
        email: donorEmail || 'donatur@sadaqo.id',
        amount,
        mobile: donorPhone || '',
        description: campaignTitle,
        redirectUrl: `${appUrl}/transparansi/${campaignSlug}?donated=true`,
      });
    } catch (mayarErr: any) {
      console.error('Mayar API error detail:', mayarErr);
      return NextResponse.json(
        { error: `Mayar: ${mayarErr.message}` },
        { status: 502 }
      );
    }

    // Create donation record in Supabase
    const supabase = await createClient();
    const { data: donation, error } = (await (supabase
      .from('donations') as any)
      .insert({
        campaign_id: campaignId,
        donor_name: donorName,
        donor_email: donorEmail,
        donor_phone: donorPhone,
        amount,
        donation_type: donationType,
        is_anonymous: isAnonymous,
        message,
        payment_status: 'pending',
        mayar_transaction_id: mayarResponse?.data?.transactionId || mayarResponse?.data?.id || null,
        mayar_payment_url: mayarResponse?.data?.link ?? null,
      })
      .select()
      .single()) as { data: Donation | null; error: { message: string } | null };

    if (error) throw error;

    return NextResponse.json({
      paymentUrl: mayarResponse?.data?.link,
      donationId: donation?.id,
      transactionId: mayarResponse?.data?.transactionId,
    });
  } catch (error: any) {
    console.error('Create payment error:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal membuat link pembayaran' },
      { status: 500 }
    );
  }
}
