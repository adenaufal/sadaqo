'use client';

import { motion } from 'motion/react';
import { CheckCircle2, Circle, Megaphone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ease = [0.25, 1, 0.5, 1] as const;

const stepsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const stepItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
};

interface OnboardingChecklistProps {
  displayName: string;
  hasCampaign: boolean;
}

export function OnboardingChecklist({ displayName, hasCampaign }: OnboardingChecklistProps) {
  const steps = [
    { label: 'Buat akun AmanahFlow', done: true },
    { label: 'Buat kampanye pertama Anda', done: hasCampaign },
    { label: 'Bagikan link kampanye ke jamaah via WhatsApp', done: false },
  ];

  const completedCount = steps.filter((s) => s.done).length;
  const pct = Math.round((completedCount / steps.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-emerald-500/5 p-6"
    >
      <div className="flex items-start gap-4">
        <motion.div
          className="w-10 h-10 rounded-xl gradient-emerald flex items-center justify-center shrink-0"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h2 className="font-bold font-heading text-base">
              Selamat datang, {displayName}! 🎉
            </h2>
            <span className="text-xs font-semibold text-primary shrink-0 bg-primary/10 px-2 py-0.5 rounded-full">
              {pct}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Selesaikan 3 langkah ini untuk mulai menerima donasi dari jamaah Anda.
          </p>

          {/* Animated progress bar */}
          <div className="mb-4 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-emerald rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            />
          </div>

          <motion.div
            className="space-y-2.5"
            variants={stepsContainer}
            initial="hidden"
            animate="show"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={stepItem} className="flex items-center gap-2.5">
                {step.done ? (
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                )}
                <span
                  className={`text-sm ${step.done ? 'text-muted-foreground line-through' : 'font-medium'}`}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {!hasCampaign && (
            <motion.div
              className="mt-5 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Button asChild size="sm" className="gradient-emerald text-white">
                <Link href="/kampanye/buat">
                  <Megaphone className="w-3.5 h-3.5 mr-1.5" />
                  Buat Kampanye Pertama
                </Link>
              </Button>
              <span className="text-xs text-muted-foreground">~5 menit. Gratis.</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
