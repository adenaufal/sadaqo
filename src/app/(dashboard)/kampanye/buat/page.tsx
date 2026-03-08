'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { generateSlug } from '@/lib/utils';
import { CAMPAIGN_TYPES } from '@/lib/constants';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BuatKampanyePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    campaign_type: 'zakat_fitrah',
    target_amount: '',
    description: '',
    beneficiary_story: '',
    cover_image_url: '',
    end_date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Anda harus login terlebih dahulu');
      router.push('/login');
      return;
    }

    const slug = generateSlug(form.title) + '-' + Date.now().toString(36);

    const { data, error } = (await (supabase
      .from('campaigns') as any)
      .insert({
        user_id: user.id,
        title: form.title,
        slug,
        campaign_type: form.campaign_type,
        target_amount: Number(form.target_amount),
        description: form.description || null,
        beneficiary_story: form.beneficiary_story || null,
        cover_image_url: form.cover_image_url || null,
        end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
      })
      .select()
      .single()) as { data: Campaign | null; error: { message: string } | null };

    if (error) {
      toast.error('Gagal membuat kampanye', { description: error.message });
    } else if (data) {
      toast.success('Kampanye berhasil dibuat!');
      router.push(`/kampanye/${data.id}`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/kampanye">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-heading">Buat Kampanye Baru</h1>
          <p className="text-muted-foreground text-sm">Isi form di bawah untuk membuat kampanye donasi</p>
        </div>
      </div>

      <Card className="border-border/50">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Kampanye *</Label>
              <Input
                id="title"
                placeholder="Contoh: Zakat Fitrah Ramadhan 1447H — Masjid Al-Ikhlas"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label>Jenis Kampanye *</Label>
              <Select
                value={form.campaign_type}
                onValueChange={(v) => v && setForm({ ...form, campaign_type: v })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CAMPAIGN_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target Donasi (Rp) *</Label>
              <Input
                id="target"
                type="number"
                min={1}
                placeholder="Contoh: 25000000"
                value={form.target_amount}
                onChange={(e) => setForm({ ...form, target_amount: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Ceritakan tentang kampanye ini..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="story">Cerita Penerima Manfaat</Label>
              <Textarea
                id="story"
                placeholder="Ceritakan siapa yang akan terbantu..."
                value={form.beneficiary_story}
                onChange={(e) => setForm({ ...form, beneficiary_story: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover">URL Gambar Cover</Label>
              <Input
                id="cover"
                type="url"
                placeholder="https://..."
                value={form.cover_image_url}
                onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Tanggal Berakhir (Opsional)</Label>
              <Input
                id="endDate"
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 gradient-emerald text-white h-11"
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Buat Kampanye
              </Button>
              <Button asChild variant="outline" className="h-11">
                <Link href="/kampanye">Batal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
