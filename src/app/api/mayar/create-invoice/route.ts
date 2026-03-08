import { NextRequest, NextResponse } from 'next/server';
import { createInvoice } from '@/lib/mayar';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, donationType, amount, campaignTitle } = body;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await createInvoice({
      name,
      email,
      mobile: mobile || '',
      description: `Bukti ${donationType} - ${campaignTitle}`,
      items: [
        {
          quantity: 1,
          price: amount,
          description: `${donationType} untuk ${campaignTitle}`,
        },
      ],
      redirectUrl: appUrl,
    });

    console.log('[create-invoice] Mayar response:', JSON.stringify(response, null, 2));

    // Handle different possible field names from Mayar API
    const invoiceUrl = response?.data?.link || response?.data?.paymentUrl || response?.data?.url;
    const invoiceId = response?.data?.id;

    if (!invoiceUrl) {
      console.error('[create-invoice] No invoice URL in response:', response);
      return NextResponse.json(
        { error: 'Invoice berhasil dibuat tapi URL tidak tersedia' },
        { status: 500 }
      );
    }

    return NextResponse.json({ invoiceUrl, invoiceId });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[create-invoice] Error:', msg);
    return NextResponse.json(
      { error: msg || 'Gagal membuat bukti pembayaran' },
      { status: 500 }
    );
  }
}
