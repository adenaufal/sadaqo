'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Save, User, Building, Landmark, Bell, Plug } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PengaturanPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    organization_name: '',
    phone: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single() as { data: Profile | null };

      if (profile) {
        setForm({
          full_name: profile.full_name || '',
          organization_name: profile.organization_name || '',
          phone: profile.phone || '',
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Sesi berakhir, silakan login ulang');
      router.push('/login');
      return;
    }

    const { error } = (await (supabase
      .from('profiles') as any)
      .update({
        full_name: form.full_name,
        organization_name: form.organization_name || null,
        phone: form.phone || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)) as { error: { message: string } | null };

    if (error) {
      toast.error('Gagal menyimpan', { description: error.message });
    } else {
      toast.success('Pengaturan berhasil disimpan!');
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Pengaturan</h1>
        <p className="text-muted-foreground text-sm">Kelola profil dan pengaturan akun Anda</p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-heading flex items-center gap-2">
            <User className="w-5 h-5" />
            Profil
          </CardTitle>
          <CardDescription>Informasi dasar akun Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="full_name">Nama Lengkap *</Label>
              <Input
                id="full_name"
                placeholder="Nama lengkap Anda"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization_name" className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                Nama Organisasi / Masjid
              </Label>
              <Input
                id="organization_name"
                placeholder="Contoh: Masjid Al-Ikhlas"
                value={form.organization_name}
                onChange={(e) => setForm({ ...form, organization_name: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon / WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="08123456789"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              className="gradient-emerald text-white h-11"
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Simpan Perubahan
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Rekening Organisasi — Mockup */}
      <Card className="border-border/50 opacity-80">
        <CardHeader>
          <CardTitle className="text-lg font-heading flex items-center gap-2">
            <Landmark className="w-5 h-5" />
            Rekening Organisasi
          </CardTitle>
          <CardDescription>Rekening penerimaan donasi resmi organisasi Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nama Bank</Label>
            <Select disabled>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Pilih bank..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bri">BRI</SelectItem>
                <SelectItem value="bca">BCA</SelectItem>
                <SelectItem value="mandiri">Mandiri</SelectItem>
                <SelectItem value="bsi">BSI</SelectItem>
                <SelectItem value="muamalat">Bank Muamalat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Nomor Rekening</Label>
            <Input className="h-11" placeholder="0123456789" disabled />
          </div>
          <div className="space-y-2">
            <Label>Nama Pemilik Rekening</Label>
            <Input className="h-11" placeholder="Nama sesuai rekening" disabled />
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 px-4 py-3">
            <span className="text-amber-700 dark:text-amber-400 text-sm">
              🔒 Segera hadir — rekening akan diverifikasi oleh tim Sadaqo
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Notifikasi — Mockup */}
      <Card className="border-border/50 opacity-80">
        <CardHeader>
          <CardTitle className="text-lg font-heading flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifikasi
          </CardTitle>
          <CardDescription>Atur kapan dan bagaimana Anda menerima pemberitahuan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Notifikasi email saat ada donasi masuk', defaultOn: true },
            { label: 'Ringkasan donasi mingguan', defaultOn: false },
            { label: 'Notifikasi WhatsApp', defaultOn: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-foreground/70">{item.label}</span>
              <div className={`w-10 h-5 rounded-full transition-colors ${item.defaultOn ? 'bg-primary/40' : 'bg-muted'} cursor-not-allowed relative`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${item.defaultOn ? 'left-5' : 'left-0.5'}`} />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 px-4 py-3">
            <span className="text-amber-700 dark:text-amber-400 text-sm">🔒 Segera hadir</span>
          </div>
        </CardContent>
      </Card>

      {/* Integrasi — Mockup */}
      <Card className="border-border/50 opacity-80">
        <CardHeader>
          <CardTitle className="text-lg font-heading flex items-center gap-2">
            <Plug className="w-5 h-5" />
            Integrasi
          </CardTitle>
          <CardDescription>Hubungkan Sadaqo dengan platform lain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
            <div>
              <p className="text-sm font-medium">Mayar Payment</p>
              <p className="text-xs text-muted-foreground">Gateway pembayaran</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
              Terhubung
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
            <div>
              <p className="text-sm font-medium">WhatsApp Business</p>
              <p className="text-xs text-muted-foreground">Notifikasi otomatis ke donatur</p>
            </div>
            <Button size="sm" variant="outline" disabled className="text-xs">
              Segera Hadir
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Integrasi lanjutan akan tersedia setelah peluncuran.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
