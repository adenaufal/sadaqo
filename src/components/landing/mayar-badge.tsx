'use client';

import { motion } from 'motion/react';
import { CreditCard, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

export function MayarBadge() {
  return (
    <section className="py-12 lg:py-16 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Dana jamaah diproses langsung oleh
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border/60 shadow-sm">
            <CreditCard className="w-6 h-6 text-primary" />
            <div className="text-left">
              <p className="font-bold text-base font-heading">Mayar</p>
              <p className="text-xs text-muted-foreground">Payment Gateway Terpercaya Indonesia</p>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground max-w-sm mx-auto">
            Setiap transaksi diproses oleh Mayar dan tercatat publik — donatur dapat memverifikasi setiap donasi kapan saja.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Terenkripsi & Aman</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span>Semua Metode Pembayaran</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-primary" />
              <span>QRIS, Transfer, E-Wallet</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground text-center mb-4">Dibangun dengan</p>
            <div className="flex items-center justify-center gap-6">
              <Image src="/logo/next-js.svg" alt="Next.js" width={80} height={20} className="opacity-60 dark:invert" />
              <span className="text-border/60 text-sm">×</span>
              <Image src="/logo/mayar.svg" alt="Mayar" width={72} height={24} className="opacity-60" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
