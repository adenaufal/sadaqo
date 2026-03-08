'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface CampaignCreatedBannerProps {
  campaignTitle: string;
  campaignUrl: string;
}

export function CampaignCreatedBanner({ campaignTitle, campaignUrl }: CampaignCreatedBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Confetti burst — emerald/gold Islamic palette
    const end = Date.now() + 1800;
    const colors = ['#10b981', '#059669', '#d97706', '#fbbf24', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        gravity: 0.9,
        scalar: 0.8,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        gravity: 0.9,
        scalar: 0.8,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  if (dismissed) return null;

  const whatsappText = encodeURIComponent(
    `Assalamu'alaikum, kami membuka kampanye "${campaignTitle}".\n\nYuk berdonasi dan lihat progress transparansinya di sini:\n${campaignUrl}\n\nJazakallahu khairan 🤲`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-4 flex items-start gap-4">
      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-emerald-800 dark:text-emerald-300">
          Barakallahu fiikum! 🤲 Kampanye berhasil dibuat.
        </p>
        <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-0.5 mb-3">
          Bagikan ke jamaah sekarang — donasi pertama mungkin datang dalam hitungan menit.
        </p>
        <Button
          size="sm"
          className="bg-[#25D366] hover:bg-[#20BD5A] text-white"
          onClick={() => window.open(whatsappUrl, '_blank')}
        >
          <Share2 className="w-3.5 h-3.5 mr-1.5" />
          Bagikan via WhatsApp
        </Button>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-emerald-600/60 hover:text-emerald-600 dark:text-emerald-400/60 dark:hover:text-emerald-400 transition-colors shrink-0"
        aria-label="Tutup"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
