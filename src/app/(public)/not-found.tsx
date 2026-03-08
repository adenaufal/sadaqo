import { Button } from '@/components/ui/button';
import { Moon, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

export default function PublicNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero islamic-pattern px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-emerald mb-6">
          <Moon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold font-heading text-gradient-emerald mb-2">404</h1>
        <h2 className="text-xl font-bold font-heading mb-2">Kampanye Tidak Ditemukan</h2>
        <p className="text-muted-foreground mb-8">
          Maaf, kampanye yang Anda cari tidak tersedia atau sudah berakhir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="gradient-emerald text-white">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/kalkulator-zakat">
              <Search className="w-4 h-4 mr-2" />
              Hitung Zakat
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
