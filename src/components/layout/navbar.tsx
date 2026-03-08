'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Calculator, LogIn, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-emerald flex items-center justify-center">
            <Moon className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold font-heading text-gradient-emerald">ZakatFlow</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/kalkulator-zakat"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4" />
            Kalkulator Zakat
          </Link>
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">
              <LogIn className="w-4 h-4 mr-1.5" />
              Masuk
            </Link>
          </Button>
          <Button asChild size="sm" className="gradient-emerald text-white">
            <Link href="/register">Daftar</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'sm:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg overflow-hidden transition-all duration-200',
          mobileOpen ? 'max-h-60' : 'max-h-0'
        )}
      >
        <div className="px-4 py-4 space-y-3">
          <Link
            href="/kalkulator-zakat"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <Calculator className="w-4 h-4" />
            Kalkulator Zakat
          </Link>
          <div className="flex gap-2 pt-1">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <LogIn className="w-4 h-4 mr-1.5" />
                Masuk
              </Link>
            </Button>
            <Button asChild size="sm" className="flex-1 gradient-emerald text-white">
              <Link href="/register" onClick={() => setMobileOpen(false)}>
                Daftar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
