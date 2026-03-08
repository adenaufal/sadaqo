'use client';

import { Button } from '@/components/ui/button';
import { Menu, Plus, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TopbarProps {
  onMenuClick: () => void;
}

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/kampanye': 'Kampanye',
  '/kampanye/buat': 'Buat Kampanye',
  '/transaksi': 'Transaksi',
  '/pengaturan': 'Pengaturan',
};

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const pageName = pageNames[pathname] || 'Dashboard';

  return (
    <header className="h-16 border-b border-border/50 bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
          <Moon className="w-3.5 h-3.5 text-primary" />
          <span>{pageName}</span>
        </div>
      </div>

      <Button asChild size="sm" className="gradient-emerald text-white">
        <Link href="/kampanye/buat">
          <Plus className="w-4 h-4 mr-1" />
          Buat Kampanye
        </Link>
      </Button>
    </header>
  );
}
