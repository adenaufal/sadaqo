import { Moon } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-emerald flex items-center justify-center">
                <Moon className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold font-heading text-gradient-emerald">Sadaqo</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Kampanye donasi masjid. Siap bagikan dalam 5 menit.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/kalkulator-zakat" className="hover:text-primary transition-colors">Kalkulator Zakat</Link></li>
              <li><Link href="/register" className="hover:text-primary transition-colors">Buat Kampanye</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Masuk Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Zakat</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/kalkulator-zakat" className="hover:text-primary transition-colors">Zakat Fitrah</Link></li>
              <li><Link href="/kalkulator-zakat" className="hover:text-primary transition-colors">Zakat Mal</Link></li>
              <li><Link href="/kalkulator-zakat" className="hover:text-primary transition-colors">Zakat Profesi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Lainnya</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/artikel/panduan-zakat-fitrah" className="hover:text-primary transition-colors">Panduan Zakat Fitrah</Link></li>
              <li><Link href="/artikel/transparansi-donasi-masjid" className="hover:text-primary transition-colors">Transparansi Donasi</Link></li>
              <li><span>Powered by Mayar</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sadaqo. Dibuat untuk Mayar Vibecoding Competition Ramadhan 2026.</p>
        </div>
      </div>
    </footer>
  );
}
