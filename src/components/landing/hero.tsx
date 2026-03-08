'use client';

import { Button } from '@/components/ui/button';
import { Moon, ArrowRight, Calculator, BarChart3, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero islamic-pattern" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Moon className="w-4 h-4" />
              <span>Khusus Masjid &amp; Komunitas Muslim Indonesia</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Jamaah Tanya Progress Donasi Terus?{' '}
            <span className="text-gradient-emerald">Kini Mereka Bisa Cek Sendiri.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AmanahFlow beri masjid Anda halaman kampanye zakat profesional, kalkulator zakat bawaan,
            dan transparansi publik yang bisa dicek jamaah kapan saja — siap dibagikan ke WhatsApp
            dalam 5 menit. Gratis.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="lg" className="gradient-emerald text-white h-12 px-8 text-base shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/register">
                Buat Kampanye Pertama Saya
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href="/kalkulator-zakat">
                <Calculator className="w-4 h-4 mr-2" />
                Coba Kalkulator Zakat
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { icon: Shield, label: '0 Ribet', desc: 'Tanpa developer' },
              { icon: Clock, label: '5 Menit', desc: 'Kampanye siap bagikan' },
              { icon: BarChart3, label: '100% Amanah', desc: 'Dana langsung ke masjid' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-semibold text-sm">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
