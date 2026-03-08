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

const features = [
  {
    icon: Megaphone,
    title: 'Buat Kampanye dalam Hitungan Menit',
    description:
      'Buat kampanye zakat fitrah, zakat mal, infaq, sedekah, atau wakaf. Dapatkan halaman kampanye yang siap dibagikan langsung.',
  },
  {
    icon: Calculator,
    title: 'Kalkulator Zakat Terintegrasi',
    description:
      'Kalkulator zakat fitrah, zakat mal, dan zakat profesi. Donatur langsung tahu berapa yang harus dibayar dan bisa langsung bayar.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Real-time',
    description:
      'Pantau progres kampanye, jumlah donatur, dan total terkumpul secara real-time. Semua data terupdate otomatis.',
  },
  {
    icon: Users,
    title: 'Database Donatur (Muzakki)',
    description:
      'Kelola data donatur secara otomatis. Lihat riwayat donasi, total kontribusi, dan kirim bukti zakat digital.',
  },
  {
    icon: Shield,
    title: 'Transparansi Penuh',
    description:
      'Halaman transparansi publik untuk setiap kampanye. Siapa saja bisa melihat progres dan daftar donatur secara real-time.',
  },
  {
    icon: Share2,
    title: 'Bagikan via WhatsApp',
    description:
      'Tombol berbagi WhatsApp dengan pesan yang sudah diformat. Satu klik untuk menyebarkan kampanye ke jamaah masjid.',
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
          >
            <p className="text-sm font-semibold text-primary mb-2">FITUR UNGGULAN</p>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">
              Semua yang Anda Butuhkan untuk{' '}
              <span className="text-gradient-emerald">Mengelola Donasi</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Dari pembuatan kampanye hingga pelaporan transparan — semua dalam satu platform.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold font-heading text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
