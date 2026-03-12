import { ZakatCalculator } from '@/components/zakat/zakat-calculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/layout/footer';
import { Moon, ArrowLeft, Wheat, Coins, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator Zakat',
  description: 'Hitung zakat fitrah, zakat mal, dan zakat profesi Anda dengan mudah dan akurat.',
};

export default function KalkulatorZakatPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-emerald flex items-center justify-center">
              <Moon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold font-heading text-gradient-emerald">Sadaqo</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Beranda
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading">Kalkulator Zakat</h1>
          <p className="mt-2 text-muted-foreground">
            Hitung kewajiban zakat Anda dengan mudah dan akurat
          </p>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Pilih Jenis Zakat</CardTitle>
            <CardDescription>
              Pilih tab di bawah untuk menghitung zakat fitrah, zakat mal, atau zakat profesi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ZakatCalculator />
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {[
            {
              title: 'Zakat Fitrah',
              desc: '2.5 kg beras per orang. Wajib sebelum Idul Fitri.',
              icon: Wheat,
            },
            {
              title: 'Zakat Mal',
              desc: '2.5% dari harta di atas nisab (85 gram emas).',
              icon: Coins,
            },
            {
              title: 'Zakat Profesi',
              desc: '2.5% dari penghasilan bulanan di atas nisab.',
              icon: Briefcase,
            },
          ].map((info) => (
            <Card key={info.title} className="border-border/50">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{info.title}</h3>
                <p className="text-xs text-muted-foreground">{info.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
