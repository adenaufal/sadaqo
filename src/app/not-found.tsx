import { Button } from '@/components/ui/button';
import { Moon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero islamic-pattern px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-emerald mb-6">
          <Moon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-6xl font-bold font-heading text-gradient-emerald mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Halaman tidak ditemukan</p>
        <Button asChild className="gradient-emerald text-white">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}
