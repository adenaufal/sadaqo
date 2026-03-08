import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const MAYAR_BASE_URL = process.env.MAYAR_API_BASE_URL || 'https://api.mayar.club/hl/v1';
const MAYAR_API_KEY = process.env.MAYAR_API_KEY || '';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '20';
    const status = searchParams.get('status') || '';

    let endpoint = `/transaction/list?page=${page}&pageSize=${pageSize}`;
    if (status) endpoint += `&status=${status}`;

    const res = await fetch(`${MAYAR_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${MAYAR_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'Mayar API error', details: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
