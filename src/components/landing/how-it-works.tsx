'use client';

import { motion } from 'motion/react';
import { UserPlus, Megaphone, CreditCard, BarChart3 } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: 'Daftar & Buat Akun',
    description: 'Daftar gratis dalam 30 detik. Tidak perlu kartu kredit atau setup rumit.',
  },
  {
    step: 2,
    icon: Megaphone,
    title: 'Buat Kampanye',
    description: 'Pilih jenis donasi, tentukan target, dan kampanye langsung siap dibagikan.',
  },
  {
    step: 3,
    icon: CreditCard,
    title: 'Terima Donasi',
    description: 'Donatur membayar via Mayar. Semua metode pembayaran didukung otomatis.',
  },
  {
    step: 4,
    icon: BarChart3,
    title: 'Pantau Real-time',
    description: 'Lihat progres, kelola donatur, dan bagikan transparansi ke publik.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-primary mb-2">CARA KERJA</p>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">
              Mulai dalam <span className="text-gradient-emerald">4 Langkah Mudah</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Tidak perlu keahlian teknis. Siapa saja bisa membuat kampanye donasi profesional.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line (hidden on mobile, shown on lg) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}

              {/* Step number badge */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4">
                <item.icon className="w-8 h-8 text-primary" />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full gradient-emerald text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {item.step}
                </div>
              </div>

              <h3 className="font-semibold font-heading text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
