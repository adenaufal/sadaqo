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
    default: 'ZakatFlow — Mudahkan Pengelolaan Zakat & Donasi',
    template: '%s | ZakatFlow',
  },
  description:
    'Platform paling mudah untuk masjid dan komunitas meluncurkan kampanye fundraising Ramadhan yang transparan dengan kalkulator zakat dan Mayar payment tracking.',
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
  authors: [{ name: 'ZakatFlow' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'ZakatFlow',
    title: 'ZakatFlow — Mudahkan Pengelolaan Zakat & Donasi',
    description:
      'Platform paling mudah untuk masjid dan komunitas meluncurkan kampanye fundraising Ramadhan yang transparan.',
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
