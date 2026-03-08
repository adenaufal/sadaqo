'use client';

import { useRealtimeDonations } from '@/hooks/use-realtime-donations';
import { formatRupiah } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';

interface DonationTickerProps {
  campaignId: string;
  maxItems?: number;
}

export function DonationTicker({ campaignId, maxItems = 5 }: DonationTickerProps) {
  const { donations, loading } = useRealtimeDonations(campaignId);
  const recentDonations = donations.slice(0, maxItems);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (recentDonations.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground py-4">
        Jadilah donatur pertama!
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {recentDonations.map((donation) => (
          <motion.div
            key={donation.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30">
              <div className="w-8 h-8 rounded-full gradient-emerald flex items-center justify-center shrink-0">
                <Heart className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {donation.is_anonymous ? 'Hamba Allah' : donation.donor_name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">
                    {formatRupiah(donation.amount)}
                  </span>
                  <span>&middot;</span>
                  <span>
                    {donation.paid_at
                      ? formatDistanceToNow(new Date(donation.paid_at), {
                          addSuffix: true,
                          locale: idLocale,
                        })
                      : 'baru saja'}
                  </span>
                </div>
                {donation.message && (
                  <p className="text-xs text-muted-foreground mt-1 italic truncate">
                    &ldquo;{donation.message}&rdquo;
                  </p>
                )}
              </div>
              <Badge variant="outline" className="text-xs shrink-0">
                {donation.donation_type.replace('_', ' ')}
              </Badge>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
