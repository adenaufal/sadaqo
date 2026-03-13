'use client';

import { motion } from 'motion/react';
import { XCircle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const ease = [0.25, 1, 0.5, 1] as const;

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};
const listItemVariant = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
};
const listItemVariantRight = {
  hidden: { opacity: 0, x: 8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
};

const before = [
  'Grup WhatsApp kebanjiran "sudah transfer pak"',
  'Spreadsheet diupdate manual setiap ada donasi masuk',
  'Jamaah tanya progress — jawaban selalu berbeda-beda',
  'Tidak ada halaman resmi yang bisa disebarkan',
  'Laporan akhir Ramadhan dibuat dari catatan tidak lengkap',
];

const after = [
  'Satu link kampanye — semua donasi masuk dan tercatat otomatis',
  'Dashboard real-time, rekap tanpa effort apapun dari Anda',
  'Jamaah buka link, lihat progress sendiri, langsung puas',
  'Halaman kampanye profesional siap dibagikan ke siapa saja',
  'Laporan transparansi publik — permanen, otomatis, terpercaya',
];

export function BeforeAfter() {
  return (
    <section className="py-20 lg:py-28 xl:py-36 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Left-aligned header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12 xl:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-widest">
              Sebelum &amp; Sesudah
            </p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-heading max-w-md leading-tight">
              Pengurus Masjid Tahu Betul{' '}
              <span className="text-gradient-emerald">Rasanya.</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-sm xl:text-base text-muted-foreground max-w-xs leading-relaxed lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            800.000+ masjid di Indonesia masih mengelola zakat secara manual setiap Ramadhan.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 xl:gap-6">
          {/* SEBELUM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="rounded-2xl bg-card border border-border p-7 xl:p-9"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="font-bold font-heading text-base xl:text-lg">Tanpa Sadaqo</p>
                <p className="text-xs text-muted-foreground">Setiap Ramadhan yang berlalu</p>
              </div>
            </div>
            <motion.ul
              className="space-y-4"
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {before.map((item) => (
                <motion.li key={item} variants={listItemVariant} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-destructive/50 mt-0.5 shrink-0" />
                  <span className="text-sm xl:text-base text-muted-foreground leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* SESUDAH */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55, ease }}
            className="rounded-2xl bg-primary/5 border border-primary/20 p-7 xl:p-9"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold font-heading text-base xl:text-lg">Dengan Sadaqo</p>
                <p className="text-xs text-muted-foreground">Mulai Ramadhan ini</p>
              </div>
            </div>
            <motion.ul
              className="space-y-4"
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {after.map((item) => (
                <motion.li key={item} variants={listItemVariantRight} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm xl:text-base leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Community visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-10 xl:mt-14 rounded-2xl overflow-hidden border border-border/40 shadow-md"
        >
          <Image
            src="/char-community.png"
            alt="Komunitas jamaah masjid bersama"
            width={1200}
            height={500}
            className="w-full object-cover max-h-[280px] sm:max-h-[340px] xl:max-h-[420px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
