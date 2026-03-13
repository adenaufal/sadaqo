'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Moon, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

const ease = [0.25, 1, 0.5, 1] as const;

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};
const listItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

const riskReversal = [
  'Gratis untuk memulai',
  'Tidak perlu kartu kredit',
  'Setiap transaksi tercatat publik',
  'Donatur bisa audit kapan saja',
  'Mulai dengan kalkulator zakat tanpa perlu daftar',
];

export function CTA() {
  return (
    <section className="py-20 lg:py-28 xl:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="relative overflow-hidden rounded-3xl gradient-emerald p-10 sm:p-12 lg:p-16 xl:p-20 text-center"
        >
          {/* Islamic pattern overlay */}
          <div className="absolute inset-0 islamic-pattern opacity-10" />

          <div className="relative z-10">
            {/* Floating Moon icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Moon className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-heading text-white mb-4 max-w-2xl mx-auto leading-tight">
              Masjid Anda Layak Punya Kampanye Donasi yang Sahih.
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-base lg:text-lg">
              Bukan spreadsheet. Bukan grup WhatsApp. Platform yang membuktikan bahwa setiap rupiah dikelola dengan benar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-base font-semibold shadow-lg w-full sm:w-auto"
                >
                  <Link href="/register">
                    Mulai Sekarang, Gratis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:border-white/70 h-12 px-8 text-base w-full sm:w-auto"
                >
                  <Link href="/kalkulator-zakat">Coba Kalkulator Zakat</Link>
                </Button>
              </motion.div>
            </div>

            <motion.ul
              className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2"
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {riskReversal.map((item) => (
                <motion.li key={item} variants={listItem} className="flex items-center gap-1.5 text-white/85 text-xs xl:text-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/70 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
