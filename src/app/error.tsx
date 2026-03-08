'use client';

import { Button } from '@/components/ui/button';
import { Moon, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero islamic-pattern px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-emerald mb-6">
          <Moon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold font-heading mb-2">Terjadi Kesalahan</h1>
        <p className="text-muted-foreground mb-8">
          Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="gradient-emerald text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Coba Lagi
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
