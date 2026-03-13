'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const ease = [0.25, 1, 0.5, 1] as const;

const testimonials = [
  {
    quote: 'Dulu tiap Ramadhan saya harus update spreadsheet manual dan jawab pertanyaan jamaah satu-satu. Sekarang cukup kirim satu link — mereka lihat sendiri.',
    name: 'Ustaz Fajar',
    role: 'Ketua DKM Masjid Al-Ikhlas, Bekasi',
    image: '/char-man-tablet.png',
  },
  {
    quote: 'Sangat membantu untuk kampanye zakat fitrah. Jamaah percaya karena semua transaksi bisa dicek langsung. Laporan jadi transparan tanpa kerja ekstra.',
    name: 'Ibu Rahma',
    role: 'Bendahara Mushola Al-Falah, Tangerang',
    image: '/char-woman-phone.png',
  },
];

export function SocialProof() {
  return (
    <section className="py-16 lg:py-24 xl:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Left-aligned overline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease }}
          className="text-xs font-semibold text-primary uppercase tracking-widest mb-10 xl:mb-12"
        >
          Dari pengurus masjid untuk pengurus masjid
        </motion.p>

        <div className="grid md:grid-cols-2 gap-5 xl:gap-7">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease }}
              className="flex flex-col justify-between p-7 xl:p-9 rounded-2xl bg-card border border-border/50 hover:border-primary/15 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              {/* Decorative large quotation mark */}
              <div>
                <span className="block text-5xl xl:text-6xl font-serif leading-none text-primary/20 mb-3 select-none">&ldquo;</span>
                <p className="text-base xl:text-lg leading-relaxed text-foreground/80 mb-6">
                  {t.quote}
                </p>
              </div>

              {/* Attribution */}
              <div className="flex items-center gap-4 pt-5 border-t border-border/40">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={52}
                  height={52}
                  className="w-[52px] h-[52px] xl:w-[60px] xl:h-[60px] rounded-xl object-cover object-top shrink-0"
                />
                <div>
                  <p className="font-semibold text-sm xl:text-base leading-none mb-1">{t.name}</p>
                  <p className="text-xs xl:text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
