'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { shareViaWhatsApp, formatRupiah, calculateProgress } from '@/lib/utils';
import { toast } from 'sonner';

interface ShareButtonProps {
  campaignTitle: string;
  campaignUrl: string;
  collected: number;
  target: number;
}

export function ShareButton({ campaignTitle, campaignUrl, collected, target }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(campaignUrl);
      setCopied(true);
      toast.success('Link berhasil disalin!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Gagal menyalin link');
    }
  };

  const handleWhatsApp = () => {
    shareViaWhatsApp(campaignTitle, campaignUrl, collected, target);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
      >
        <Share2 className="w-4 h-4" />
        Bagikan
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleWhatsApp}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Bagikan via WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>
          {copied ? (
            <Check className="w-4 h-4 mr-2 text-emerald-600" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          {copied ? 'Tersalin!' : 'Salin Link'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
