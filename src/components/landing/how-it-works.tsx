'use client';

import { motion } from 'motion/react';
import { UserPlus, Megaphone, CreditCard, BarChart3 } from 'lucide-react';

const ease = [0.25, 1, 0.5, 1] as const;

const steps = [
  { step: '01', icon: UserPlus,   title: 'Daftar & Buat Akun',    description: 'Selesai dalam 30 detik. Tidak perlu kartu kredit atau approval.' },
  { step: '02', icon: Megaphone,  title: 'Buat Kampanye',         description: 'Pilih jenis donasi, tentukan target. Siap dibagikan dalam 5 menit.' },
  { step: '03', icon: CreditCard, title: 'Terima Donasi',         description: 'Donatur bayar via QRIS, transfer bank, GoPay, OVO, Dana. Semua masuk otomatis.' },
  { step: '04', icon: BarChart3,  title: 'Pantau & Bagikan',      description: 'Lihat progres real-time, kelola database muzakki, dan bagikan transparansi ke publik.' },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 xl:py-36 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Left-aligned header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14 xl:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-widest">Cara Kerja</p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-heading max-w-lg leading-tight">
              Dari Nol ke Kampanye Aktif —{' '}
              <span className="text-gradient-emerald">Lebih Cepat dari Rapat DKM</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-sm xl:text-base text-muted-foreground max-w-xs leading-relaxed lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            Tidak perlu keahlian teknis. Siapa saja bisa membuat kampanye donasi profesional.
          </motion.p>
        </div>

        {/* Steps — large numbered visual anchors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 xl:gap-x-10">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease }}
            >
              {/* Dashed connector line between steps (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-1rem)] border-t border-dashed border-border/60" />
              )}

              {/* Giant step number — decorative background anchor */}
              <div className="relative mb-5">
                <span className="absolute -top-3 -left-1 text-[5.5rem] xl:text-[6.5rem] font-bold leading-none text-primary/[0.06] select-none pointer-events-none tabular-nums">
                  {item.step}
                </span>
                <div className="relative inline-flex items-center justify-center w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-primary/10">
                  <item.icon className="w-6 h-6 xl:w-7 xl:h-7 text-primary" />
                </div>
              </div>

              <h3 className="font-semibold font-heading text-base xl:text-lg mb-2 leading-snug">{item.title}</h3>
              <p className="text-sm xl:text-base text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.4, ease }}
          className="mt-12 xl:mt-16 text-sm xl:text-base text-muted-foreground"
        >
          Belum yakin? Coba{' '}
          <a href="/kalkulator-zakat" className="text-primary font-medium underline underline-offset-2">
            kalkulator zakat dulu
          </a>{' '}
          — gratis, tanpa perlu daftar.
        </motion.p>
      </div>
    </section>
  );
}
