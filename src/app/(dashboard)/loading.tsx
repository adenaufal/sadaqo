'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const phrases = [
  'Memuat data amanah...',
  'Menghitung berkat jamaah...',
  'Menyiapkan laporan transparansi...',
  'Sedang memproses...',
];

export default function DashboardLoading() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground transition-all duration-500">{phrases[idx]}</p>
      </div>
    </div>
  );
}
