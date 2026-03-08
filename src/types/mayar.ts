export interface MayarPaymentResponse {
  statusCode: number;
  data: {
    id: string;
    transactionId: string;
    link: string;
  };
}

export interface MayarInvoiceResponse {
  statusCode: number;
  data: {
    id: string;
    transactionId: string;
    link: string;
  };
}

export interface MayarCustomerResponse {
  statusCode: number;
  data: {
    name: string;
    email: string;
    customerId: string;
  };
}

export interface MayarWebhookPayload {
  event: 'payment.received' | 'payment.failed' | 'payment.expired';
  data: {
    id: string;
    transactionId: string;
    amount: number;
    status: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    paidAt?: string;
  };
}

export interface MayarTransactionItem {
  id: string;
  transactionId: string;
  amount: number;
  status: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  paidAt: string | null;
}
