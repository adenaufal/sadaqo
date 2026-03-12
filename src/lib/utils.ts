import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}M`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}jt`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}rb`;
  return num.toString();
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function calculateProgress(collected: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(Math.round((collected / target) * 100), 100);
}

export function getTimeRemaining(endDate: string | null): {
  days: number;
  hours: number;
  minutes: number;
  expired: boolean;
  text: string;
} {
  if (!endDate) return { days: 0, hours: 0, minutes: 0, expired: false, text: 'Tanpa batas waktu' };

  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const diff = end - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, expired: true, text: 'Berakhir' };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return { days, hours, minutes, expired: false, text: `${days} hari lagi` };
  if (hours > 0) return { days, hours, minutes, expired: false, text: `${hours} jam lagi` };
  return { days, hours, minutes, expired: false, text: `${minutes} menit lagi` };
}

export function shareViaWhatsApp(
  campaignTitle: string,
  campaignUrl: string,
  collected: number,
  target: number
) {
  const progress = calculateProgress(collected, target);
  const message = encodeURIComponent(
    `🕌 *${campaignTitle}*\n\n` +
      `Alhamdulillah, sudah ${progress}% tercapai!\n` +
      `Terkumpul ${formatRupiah(collected)} dari target ${formatRupiah(target)}.\n\n` +
      `Setiap donasi tercatat transparan — cek langsung di sini 👇\n` +
      `${campaignUrl}\n\n` +
      `Jazakallahu khairan 🤲`
  );
  window.open(`https://wa.me/?text=${message}`, '_blank');
}
