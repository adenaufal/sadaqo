'use client';

import { motion } from 'motion/react';
import {
  Calculator,
  Megaphone,
  Users,
  BarChart3,
  Share2,
  Shield,
} from 'lucide-react';

const ease = [0.25, 1, 0.5, 1] as const;

const features = [
  {
    icon: Megaphone,
    title: 'Tanpa Tim IT. Kampanye Siap dalam 5 Menit.',
    description:
      'Pilih jenis donasi, tentukan target, dan kampanye masjid Anda langsung jadi. Tidak perlu developer, tidak perlu setup rumit.',
  },
  {
    icon: Calculator,
    title: 'Donatur Tidak Perlu Tanya "Berapa Zakat Saya?"',
    description:
      'Kalkulator zakat fitrah, mal, dan profesi terintegrasi langsung di halaman donasi. Donatur hitung, langsung bayar — di satu tempat.',
  },
  {
    icon: BarChart3,
    title: 'Jamaah Tidak Akan Tanya Progress Lagi',
    description:
      'Dashboard real-time yang bisa dilihat siapa saja. Setiap donasi masuk langsung terlihat — tanpa Anda perlu update manual apapun.',
  },
  {
    icon: Users,
    title: 'Rekap Donatur Otomatis — Tanpa Spreadsheet',
    description:
      'Semua data muzakki tersimpan rapi otomatis. Riwayat donasi, total kontribusi, dan bukti zakat digital — semuanya ada.',
  },
  {
    icon: Shield,
    title: 'Jamaah Bisa Buktikan Sendiri — Tanpa Anda Jelaskan',
    description:
      'Setiap kampanye punya halaman transparansi publik. Siapa saja bisa cek progres dan daftar donatur — kepercayaan dibangun otomatis.',
  },
  {
    icon: Share2,
    title: 'Satu Klik. Seluruh Jamaah Tahu.',
    description:
      'Tombol berbagi WhatsApp dengan pesan yang sudah diformat rapi. Sebar kampanye ke grup masjid dalam hitungan detik.',
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="text-sm font-semibold text-primary mb-2">FITUR UNGGULAN</p>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">
              Satu Platform.{' '}
              <span className="text-gradient-emerald">Tidak Ada Lagi Rekap Manual.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Dari grup WhatsApp ke kampanye zakat yang jamaah percaya — tanpa satu baris kode pun.
            </p>
            <p className="mt-2 text-sm font-medium text-primary/70">
              Dibuat oleh Muslim, untuk pengurus masjid Indonesia.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              whileHover={{ y: -5, transition: { duration: 0.2, ease } }}
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--primary) / 0.18)' }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-semibold font-heading text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
