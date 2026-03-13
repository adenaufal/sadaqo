'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExpandableTextProps {
  children: React.ReactNode;
  /** Collapsed height in px — content taller than this gets truncated */
  collapsedHeight?: number;
}

export function ExpandableText({ children, collapsedHeight = 120 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : collapsedHeight }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="relative overflow-hidden"
      >
        {children}
        {!expanded && (
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        )}
      </motion.div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 h-7 px-2 text-xs text-primary hover:text-primary/80 -ml-2"
      >
        {expanded ? (
          <><ChevronUp className="w-3.5 h-3.5 mr-1" />Sembunyikan</>
        ) : (
          <><ChevronDown className="w-3.5 h-3.5 mr-1" />Lihat selengkapnya</>
        )}
      </Button>
    </div>
  );
}
