const MAYAR_BASE_URL = process.env.MAYAR_API_BASE_URL || 'https://api.mayar.id/hl/v1';
const MAYAR_API_KEY = process.env.MAYAR_API_KEY || '';

async function mayarFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${MAYAR_BASE_URL}${endpoint}`;
  console.log('[Mayar] POST', url);
  const res = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${MAYAR_API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[Mayar] ${res.status} ${res.statusText}:`, errorText);
    throw new Error(`Mayar API error: ${res.status} ${res.statusText} — ${errorText}`);
  }
  return res.json();
}

export async function createPaymentLink(data: {
  name: string;
  email: string;
  amount: number;
  mobile: string;
  description: string;
  redirectUrl: string;
}) {
  // Docs: POST /payment/create (Single Payment Request)
  // curl example di docs Mayar salah tulis /invoice/create — yang benar /payment/create
  return mayarFetch('/payment/create', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }),
  });
}

export async function createInvoice(data: {
  name: string;
  email: string;
  mobile: string;
  description: string;
  items: { quantity: number; price: number; description: string }[];
  redirectUrl: string;
}) {
  return mayarFetch('/invoice/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createCustomer(data: {
  name: string;
  email: string;
  mobile: string;
}) {
  return mayarFetch('/customer/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
