'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Receipt, Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface BuktiZakatButtonProps {
  donorName: string;
  donorEmail: string | null;
  donorPhone: string | null;
  amount: number;
  donationType: string;
  campaignTitle: string;
}

export function BuktiZakatButton({
  donorName,
  donorEmail,
  donorPhone,
  amount,
  donationType,
  campaignTitle,
}: BuktiZakatButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!donorEmail) {
      toast.error('Email donatur tidak tersedia', {
        description: 'Bukti zakat tidak dapat dikirim karena donatur tidak mencantumkan email.',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/mayar/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: donorName,
          email: donorEmail,
          mobile: donorPhone || '',
          donationType: donationType.replace(/_/g, ' '),
          amount,
          campaignTitle,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal membuat bukti');

      toast.success('Bukti zakat berhasil dibuat!', {
        description: 'Klik tombol di bawah untuk membuka invoice.',
        action: {
          label: 'Buka Invoice',
          onClick: () => window.open(data.invoiceUrl, '_blank'),
        },
      });
    } catch (err: any) {
      toast.error('Gagal membuat bukti zakat', { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 px-2 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
      onClick={handleGenerate}
      disabled={loading}
      title={donorEmail ? 'Generate bukti zakat via Mayar Invoice' : 'Email donatur tidak tersedia'}
    >
      {loading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Receipt className="w-3 h-3" />
      )}
      <span className="ml-1">{loading ? 'Membuat...' : 'Bukti'}</span>
    </Button>
  );
}
