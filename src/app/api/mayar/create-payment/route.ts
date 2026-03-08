import { NextRequest, NextResponse } from 'next/server';
import { createPaymentLink } from '@/lib/mayar';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

type Donation = Database['public']['Tables']['donations']['Row'];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { campaignId, donorName, donorEmail, donorPhone, amount, donationType, message, isAnonymous } = body;

    // Create payment link via Mayar
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const mayarResponse = await createPaymentLink({
      name: donorName,
      email: donorEmail,
      amount,
      mobile: donorPhone || '',
      description: `Donasi ${donationType} - ${donorName}`,
      redirectUrl: `${appUrl}/campaign/${body.campaignSlug}?success=true`,
    });

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
        mayar_transaction_id: mayarResponse.data.transactionId,
        mayar_payment_url: mayarResponse.data.link,
      })
      .select()
      .single()) as { data: Donation | null; error: { message: string } | null };

    if (error) throw error;

    return NextResponse.json({
      paymentUrl: mayarResponse.data.link,
      donationId: donation?.id,
      transactionId: mayarResponse.data.transactionId,
    });
  } catch (error) {
    console.error('Create payment error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat link pembayaran' },
      { status: 500 }
    );
  }
}
