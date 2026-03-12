import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sadaqo — Kampanye Donasi Masjid dalam 5 Menit',
    template: '%s | Sadaqo',
  },
  description:
    'Platform donasi masjid untuk pengurus DKM Indonesia. Buat kampanye zakat dan donasi siap dibagikan ke WhatsApp dalam 5 menit. Kalkulator zakat gratis, tanpa developer.',
  keywords: [
    'zakat',
    'donasi',
    'masjid',
    'ramadhan',
    'fundraising',
    'kalkulator zakat',
    'zakat fitrah',
    'zakat mal',
    'infaq',
    'sedekah',
  ],
  authors: [{ name: 'Sadaqo' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Sadaqo',
    title: 'Sadaqo — Kampanye Donasi Masjid dalam 5 Menit',
    description:
      'Platform donasi masjid untuk pengurus DKM Indonesia. Kampanye siap bagikan ke WhatsApp dalam 5 menit, tanpa developer.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sadaqo — Kampanye Donasi Masjid dalam 5 Menit',
    description: 'Platform donasi masjid untuk pengurus DKM Indonesia. Gratis untuk mulai.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn(plusJakarta.variable, inter.variable)}>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            className: 'font-sans',
          }}
        />
      </body>
    </html>
  );
}
