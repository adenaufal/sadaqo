'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Moon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

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
              Mulai Kampanye Ramadhan Anda Sekarang
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
              Gratis, mudah, dan transparan. Buat kampanye zakat masjid Anda dalam hitungan menit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-base font-semibold shadow-lg"
              >
                <Link href="/register">
                  Daftar Gratis
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
