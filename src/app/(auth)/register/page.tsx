'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';
import { Loader2, Moon } from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/callback`,
        data: {
          full_name: fullName,
          organization_name: organizationName,
        },
      },
    });

    if (error) {
      toast.error('Gagal mendaftar', { description: error.message });
    } else {
      toast.success('Link verifikasi terkirim!', {
        description: 'Cek email Anda untuk melanjutkan pendaftaran.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero islamic-pattern px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-emerald flex items-center justify-center">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold font-heading text-gradient-emerald">Sadaqo</span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-heading">Daftar Akun Baru</CardTitle>
            <CardDescription>
              Mulai kelola kampanye donasi masjid Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  placeholder="Ahmad Fauzi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org">Nama Masjid / Organisasi</Label>
                <Input
                  id="org"
                  placeholder="Masjid Al-Ikhlas"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@masjid.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 gradient-emerald text-white"
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Daftar Sekarang
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Masuk
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
