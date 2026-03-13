'use client';

import { Button } from '@/components/ui/button';
import { Moon, ArrowRight, Calculator } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';

const ease = [0.25, 1, 0.5, 1] as const;

const contentVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const checks = [
  { value: '5 Menit', label: 'Kampanye siap bagikan' },
  { value: '100% Tercatat', label: 'Publik & bisa diaudit' },
  { value: 'Gratis', label: 'Untuk mulai' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero islamic-pattern" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-[55%] w-[640px] h-[640px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-10 items-center min-h-[100dvh] py-20 md:py-24 lg:py-0">

          {/* ── LEFT: Copy ── */}
          <motion.div
            className="flex flex-col items-start lg:pr-6"
            variants={contentVariants}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div variants={itemVariant}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs sm:text-sm font-medium mb-6 md:mb-7">
                <Moon className="w-3.5 h-3.5 shrink-0" />
                <span>Khusus Masjid &amp; Komunitas Muslim Indonesia</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl 2xl:text-7xl font-bold font-heading tracking-tight leading-[1.1] mb-5"
              variants={itemVariant}
            >
              Jamaah Tanya Progress Donasi Terus?{' '}
              <span className="text-gradient-emerald">Kini Mereka Bisa Cek Sendiri.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base xl:text-lg text-muted-foreground leading-relaxed max-w-[52ch] mb-8"
              variants={itemVariant}
            >
              Kampanye zakat profesional lengkap dengan kalkulator dan transparansi publik — siap dibagikan ke WhatsApp dalam 5 menit. Gratis.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto" variants={itemVariant}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <Button asChild size="lg" className="gradient-emerald text-white h-12 px-7 text-base shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto">
                  <Link href="/register">
                    Buat Kampanye Pertama Saya
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
                <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base w-full sm:w-auto">
                  <Link href="/kalkulator-zakat">
                    <Calculator className="w-4 h-4 mr-2" />
                    Coba Kalkulator Zakat
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Micro-stats */}
            <motion.div className="flex flex-wrap gap-x-6 gap-y-3" variants={itemVariant}>
              {checks.map((c) => (
                <div key={c.value} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{c.value}</span>
                  <span className="text-sm text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Image (desktop lg+ only — tablet uses fallback below) ── */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease }}
          >
            {/* Soft diffuse glow behind image */}
            <div className="absolute inset-6 rounded-[2.5rem] bg-primary/8 blur-2xl" />

            {/* Image frame */}
            <div className="relative w-full rounded-[1.75rem] overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.16)] border border-primary/10">
              {/* Left-edge gradient — image melts into page bg */}
              <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />

              <Image
                src="/hero-mosque.png"
                alt="Komunitas masjid menggunakan Sadaqo untuk kampanye donasi"
                width={1200}
                height={675}
                className="w-full object-cover"
                priority
              />
            </div>

            {/* Floating badge — live donation activity */}
            <motion.div
              className="absolute -left-5 top-10 bg-card border border-border rounded-2xl px-4 py-3 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] flex items-center gap-3 z-20"
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9, ease }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground leading-none mb-0.5">Rp 127,5 jt terkumpul</p>
                <p className="text-[11px] text-muted-foreground">Masjid Al-Ikhlas, Jakarta</p>
              </div>
            </motion.div>

            {/* Floating badge — WhatsApp share CTA */}
            <motion.div
              className="absolute -right-4 bottom-14 bg-card border border-border rounded-2xl px-4 py-3 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] flex items-center gap-3 z-20"
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1, ease }}
            >
              <div className="w-8 h-8 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground leading-none mb-0.5">Bagikan ke WhatsApp</p>
                <p className="text-[11px] text-muted-foreground">Link kampanye otomatis</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Tablet + Mobile image fallback (hidden on lg+) ── */}
          <motion.div
            className="relative lg:hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-primary/10">
              <Image
                src="/hero-mosque.png"
                alt="Komunitas masjid menggunakan Sadaqo untuk kampanye donasi"
                width={1200}
                height={675}
                className="w-full object-cover"
                priority
              />

              {/* Floating badge inside mobile/tablet image — bottom overlay */}
              <motion.div
                className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl px-3 py-2 flex items-center gap-2.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0, ease }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <p className="text-xs font-semibold text-foreground">Rp 127,5 jt terkumpul</p>
                <p className="text-[11px] text-muted-foreground">Al-Ikhlas, Jakarta</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
