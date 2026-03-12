'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DONATION_TYPES, QUICK_AMOUNTS } from '@/lib/constants';
import { formatRupiah } from '@/lib/utils';
import { Loader2, Heart, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DonationFormProps {
  campaignId: string;
  campaignSlug: string;
  campaignTitle: string;
  defaultType?: string;
  prefilledAmount?: number;
}

export function DonationForm({
  campaignId,
  campaignSlug,
  campaignTitle,
  defaultType = 'infaq',
  prefilledAmount,
}: DonationFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    donor_name: '',
    donor_email: '',
    donor_phone: '',
    amount: prefilledAmount?.toString() || '',
    donation_type: defaultType,
    is_anonymous: false,
    message: '',
  });

  const handleQuickAmount = (amount: number) => {
    setForm((prev) => ({ ...prev, amount: amount.toString() }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/mayar/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          campaignSlug,
          campaignTitle,
          donorName: form.is_anonymous ? 'Hamba Allah' : form.donor_name,
          donorEmail: form.donor_email,
          donorPhone: form.donor_phone,
          amount: Number(form.amount),
          donationType: form.donation_type,
          isAnonymous: form.is_anonymous,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal membuat pembayaran');
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        toast.success('Donasi berhasil dibuat!');
      }
    } catch (err: any) {
      toast.error('Gagal memproses donasi', { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Berdonasi untuk {campaignTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Quick Amounts */}
          <div className="space-y-2">
            <Label>Pilih Nominal</Label>
            <div className="grid grid-cols-3 gap-2">
              {QUICK_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={form.amount === amount.toString() ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleQuickAmount(amount)}
                  className={form.amount === amount.toString() ? 'gradient-emerald text-white' : ''}
                >
                  {formatRupiah(amount)}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Nominal Donasi (Rp) *</Label>
            <CurrencyInput
              id="amount"
              value={Number(form.amount) || 0}
              onChange={(val) => setForm({ ...form, amount: val.toString() })}
              placeholder="Masukkan nominal"
              className="h-11 text-lg font-bold"
              required
            />
          </div>

          {/* Donation Type */}
          <div className="space-y-2">
            <Label>Jenis Donasi</Label>
            <Select
              value={form.donation_type}
              onValueChange={(v) => v && setForm({ ...form, donation_type: v })}
            >
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DONATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Donor Info */}
          <div className="space-y-2">
            <Label htmlFor="donor_name">Nama {form.is_anonymous ? '(opsional)' : '*'}</Label>
            <Input
              id="donor_name"
              placeholder="Nama Anda"
              value={form.donor_name}
              onChange={(e) => setForm({ ...form, donor_name: e.target.value })}
              required={!form.is_anonymous}
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="donor_email">Email *</Label>
              <Input
                id="donor_email"
                type="email"
                placeholder="email@contoh.com"
                value={form.donor_email}
                onChange={(e) => setForm({ ...form, donor_email: e.target.value })}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="donor_phone">WhatsApp *</Label>
              <Input
                id="donor_phone"
                type="tel"
                placeholder="08123456789"
                value={form.donor_phone}
                onChange={(e) => setForm({ ...form, donor_phone: e.target.value })}
                required
                className="h-11"
              />
            </div>
          </div>

          {/* Anonymous toggle */}
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_anonymous}
              onChange={(e) => setForm({ ...form, is_anonymous: e.target.checked })}
              className="rounded border-border"
            />
            Sembunyikan nama saya (Hamba Allah)
          </label>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Pesan / Doa (opsional)</Label>
            <Textarea
              id="message"
              placeholder="Semoga bermanfaat..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={2}
            />
          </div>

          <Button
            type="submit"
            className="w-full gradient-emerald text-white h-12 text-base font-semibold group"
            disabled={loading || !form.amount}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-150" />
            )}
            {loading ? 'Menitipkan amanah Anda... 🤲' : `Donasi ${form.amount ? formatRupiah(Number(form.amount)) : ''}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
