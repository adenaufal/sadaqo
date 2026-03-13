'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { CAMPAIGN_TYPES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, ImagePlus, X } from 'lucide-react';
import Link from 'next/link';

export default function EditKampanyePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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
    is_active: true,
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error || !data) { router.push('/kampanye'); return; }

      const d = data as any;
      setForm({
        title: d.title,
        campaign_type: d.campaign_type,
        target_amount: String(d.target_amount),
        description: d.description || '',
        beneficiary_story: d.beneficiary_story || '',
        cover_image_url: d.cover_image_url || '',
        end_date: d.end_date ? d.end_date.slice(0, 10) : '',
        is_active: d.is_active ?? true,
      });
      if (d.cover_image_url) setImagePreview(d.cover_image_url);
      setFetching(false);
    };
    fetchCampaign();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Ukuran gambar maksimal 5MB'); return; }

    setUploadingImage(true);
    setImagePreview(URL.createObjectURL(file));

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from('campaign-covers')
      .upload(fileName, file, { upsert: false });

    if (error) {
      toast.error('Gagal upload gambar', { description: error.message });
      setImagePreview(form.cover_image_url || null);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('campaign-covers').getPublicUrl(data.path);
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

    const { error } = await supabase
      .from('campaigns')
      .update({
        title: form.title,
        campaign_type: form.campaign_type,
        target_amount: Number(form.target_amount),
        description: form.description || null,
        beneficiary_story: form.beneficiary_story || null,
        cover_image_url: form.cover_image_url || null,
        end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
        is_active: form.is_active,
      } as any)
      .eq('id', id);

    if (error) {
      toast.error('Gagal menyimpan perubahan', { description: error.message });
    } else {
      toast.success('Kampanye berhasil diperbarui');
      router.push(`/kampanye/${id}`);
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/kampanye/${id}`}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-heading">Edit Kampanye</h1>
          <p className="text-muted-foreground text-sm">Perbarui informasi kampanye donasi</p>
        </div>
      </div>

      <Card className="border-border/50">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Kampanye *</Label>
              <Input
                id="title"
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
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="story">Cerita Penerima Manfaat</Label>
              <Textarea
                id="story"
                value={form.beneficiary_story}
                onChange={(e) => setForm({ ...form, beneficiary_story: e.target.value })}
                rows={3}
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

            <div className="flex items-center gap-3 py-1">
              <input
                id="is_active"
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="w-4 h-4 accent-emerald-600"
              />
              <Label htmlFor="is_active" className="cursor-pointer">Kampanye aktif (menerima donasi)</Label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 gradient-emerald text-white h-11"
                disabled={loading || uploadingImage}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Simpan Perubahan
              </Button>
              <Button asChild variant="outline" className="h-11">
                <Link href={`/kampanye/${id}`}>Batal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
