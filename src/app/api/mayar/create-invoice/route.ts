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

    return NextResponse.json({
      invoiceUrl: response.data.link,
      invoiceId: response.data.id,
    });
  } catch (error) {
    console.error('Create invoice error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat bukti pembayaran' },
      { status: 500 }
    );
  }
}
