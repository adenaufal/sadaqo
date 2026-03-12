'use client';

import { motion } from 'motion/react';
import { XCircle, CheckCircle2 } from 'lucide-react';

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
    <section className="py-20 lg:py-28 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
            Sebelum &amp; Sesudah
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading">
            Pengurus Masjid Tahu Betul{' '}
            <span className="text-gradient-emerald">Rasanya.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            800.000+ masjid di Indonesia masih mengelola zakat secara manual setiap Ramadhan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* SEBELUM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="rounded-2xl bg-card border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="font-bold font-heading text-base">Tanpa Sadaqo</p>
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
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
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
            className="rounded-2xl bg-primary/5 border border-primary/20 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold font-heading text-base">Dengan Sadaqo</p>
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
                  <span className="text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
