'use client';

import { motion } from 'motion/react';
import { Calculator, Megaphone, Users, BarChart3, Share2, Shield } from 'lucide-react';

const ease = [0.25, 1, 0.5, 1] as const;

// Alternating col-span pattern: [2+1] [1+2] [1+2] = 6 items in 3 rows of a 3-col grid
const features = [
  { icon: Megaphone, title: 'Tanpa Tim IT. Kampanye Siap dalam 5 Menit.', description: 'Pilih jenis donasi, tentukan target, kampanye langsung jadi. Tidak perlu developer, tidak perlu setup rumit.', wide: true },
  { icon: Calculator, title: 'Donatur Tidak Perlu Tanya "Berapa Zakat Saya?"', description: 'Kalkulator zakat fitrah, mal, dan profesi terintegrasi. Donatur hitung dan bayar di satu halaman.', wide: false },
  { icon: BarChart3, title: 'Jamaah Tidak Akan Tanya Progress Lagi', description: 'Dashboard real-time yang bisa dilihat siapa saja. Setiap donasi masuk otomatis — tanpa update manual.', wide: false },
  { icon: Users, title: 'Rekap Donatur Otomatis — Tanpa Spreadsheet', description: 'Semua data muzakki tersimpan otomatis — riwayat donasi, total kontribusi, dan bukti zakat digital.', wide: true },
  { icon: Shield, title: 'Jamaah Bisa Buktikan Sendiri', description: 'Setiap kampanye punya halaman transparansi publik. Siapa saja bisa cek progres dan daftar donatur.', wide: false },
  { icon: Share2, title: 'Satu Klik. Seluruh Jamaah Tahu.', description: 'Tombol berbagi WhatsApp dengan pesan yang sudah diformat rapi. Sebar kampanye ke grup masjid dalam hitungan detik.', wide: true },
];

export function Features() {
  return (
    <section className="py-20 lg:py-28 xl:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Left-aligned header with description pushed to the right — anti-center bias */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14 xl:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-widest">Fitur Unggulan</p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-heading max-w-md leading-tight">
              Satu Platform.{' '}
              <span className="text-gradient-emerald">Tidak Ada Lagi Rekap Manual.</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-sm xl:text-base text-muted-foreground max-w-xs leading-relaxed lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            Dari grup WhatsApp ke kampanye zakat yang jamaah percaya — tanpa satu baris kode pun.
          </motion.p>
        </div>

        {/* Asymmetric Bento grid — at md: 2 cols equal; at lg: 3 cols with alternating col-spans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease }}
              whileHover={{ y: -3, transition: { duration: 0.2, ease } }}
              className={`group rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 ${
                f.wide ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div className={`p-6 xl:p-8 h-full flex gap-5 xl:gap-6 ${f.wide ? 'lg:flex-row lg:items-center' : 'flex-col'}`}>
                <div className={f.wide ? 'shrink-0' : 'mb-1'}>
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors duration-200">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold font-heading text-base xl:text-lg mb-2 leading-snug">{f.title}</h3>
                  <p className="text-sm xl:text-base text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-6 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
        >
          Dibuat oleh Muslim, untuk pengurus masjid Indonesia.
        </motion.p>
      </div>
    </section>
  );
}
