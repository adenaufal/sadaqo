'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Moon, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

const riskReversal = [
  'Gratis selamanya untuk memulai',
  'Tidak perlu kartu kredit',
  'Dana donatur tidak pernah melalui kami — langsung ke rekening masjid',
  'Mulai dengan kalkulator zakat tanpa perlu daftar',
];

export function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl gradient-emerald p-12 lg:p-16 text-center"
        >
          {/* Islamic pattern overlay */}
          <div className="absolute inset-0 islamic-pattern opacity-10" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
              <Moon className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-white mb-4">
              Masjid Anda Layak Punya Sistem Donasi yang Amanah.
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-2 text-lg">
              Bukan spreadsheet. Bukan grup WhatsApp. Platform yang membuktikan kepada jamaah
              bahwa setiap rupiah dikelola dengan benar.
            </p>
            <p className="text-white/60 max-w-md mx-auto mb-8 text-sm">
              Ramadhan datang sekali setahun. Kampanye zakat yang amanah bisa dimulai hari ini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-base font-semibold shadow-lg"
              >
                <Link href="/register">
                  Daftar Gratis — Kampanye Pertama Jalan Hari Ini
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-base"
              >
                <Link href="/kalkulator-zakat">Coba Kalkulator Zakat</Link>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {riskReversal.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-white/70 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
