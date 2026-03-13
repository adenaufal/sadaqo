'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { generateSlug } from '@/lib/utils';
import { CAMPAIGN_TYPES } from '@/lib/constants';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, ImagePlus, X } from 'lucide-react';
import Link from 'next/link';
import { MarkdownEditor } from '@/components/ui/markdown-editor';

export default function BuatKampanyePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: '',
    campaign_type: 'zakat_fitrah',
    target_amount: '',
    description: '',
    beneficiary_story: '',
    cover_image_url: '',
    end_date: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran gambar maksimal 5MB');
      return;
    }

    setUploadingImage(true);
    setImagePreview(URL.createObjectURL(file));

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from('campaign-covers')
      .upload(fileName, file, { upsert: false });

    if (error) {
      toast.error('Gagal upload gambar', { description: error.message });
      setImagePreview(null);
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('campaign-covers')
        .getPublicUrl(data.path);
      setForm((f) => ({ ...f, cover_image_url: publicUrl }));
    }

    setUploadingImage(false);
  };

  const removeImage = () => {
    setImagePreview(null);
    setForm((f) => ({ ...f, cover_image_url: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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

    // Pastikan profile ada sebelum insert kampanye (guard FK violation)
    await (supabase.from('profiles') as any).upsert(
      {
        id: user.id,
        full_name:
          user.user_metadata?.full_name ||
          user.email ||
          'Admin',
        organization_name: user.user_metadata?.organization_name || null,
      },
      { onConflict: 'id', ignoreDuplicates: true }
    );

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
      toast.success('Barakallahu fiikum! 🤲', {
        description: 'Kampanye berhasil dibuat. Bagikan ke jamaah dan mulai terima donasi.',
      });
      router.push(`/kampanye/${data.id}?created=1`);
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
              <MarkdownEditor
                id="description"
                value={form.description}
                onChange={(v) => setForm({ ...form, description: v })}
                placeholder="Ceritakan tentang kampanye ini..."
                rows={4}
                hint="Mendukung Markdown: **tebal**, *miring*, - daftar"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="story">Cerita Penerima Manfaat</Label>
              <MarkdownEditor
                id="story"
                value={form.beneficiary_story}
                onChange={(v) => setForm({ ...form, beneficiary_story: v })}
                placeholder="Ceritakan siapa yang akan terbantu..."
                rows={3}
                hint="Mendukung Markdown: **tebal**, *miring*, - daftar"
              />
            </div>

            <div className="space-y-2">
              <Label>Gambar Cover</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden border border-border h-48">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-36 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  <ImagePlus className="w-8 h-8" />
                  <span className="text-sm">Klik untuk upload gambar</span>
                  <span className="text-xs">PNG, JPG, WebP — maks. 5MB</span>
                </button>
              )}
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
                disabled={loading || uploadingImage}
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
