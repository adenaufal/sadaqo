'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Donation = Database['public']['Tables']['donations']['Row'];

export function useRealtimeDonations(campaignId: string) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Initial fetch
    const fetchDonations = async () => {
      const { data } = await (supabase
        .from('donations')
        .select('*')
        .eq('campaign_id', campaignId)
        .eq('payment_status', 'paid')
        .order('paid_at', { ascending: false })
        .limit(50) as unknown as Promise<{ data: Donation[] | null }>);
      if (data) setDonations(data);
    };

    fetchDonations().then(() => setLoading(false));

    // Polling fallback every 10 seconds
    const pollInterval = setInterval(fetchDonations, 10_000);

    // Real-time subscription
    const channel = supabase
      .channel(`donations-${campaignId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'donations',
          filter: `campaign_id=eq.${campaignId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const newDonation = payload.new as Donation;
            if (newDonation.payment_status === 'paid') {
              setDonations((prev) => {
                const exists = prev.find((d) => d.id === newDonation.id);
                if (exists) {
                  return prev.map((d) => (d.id === newDonation.id ? newDonation : d));
                }
                return [newDonation, ...prev];
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      clearInterval(pollInterval);
      supabase.removeChannel(channel);
    };
  }, [campaignId]);

  return { donations, loading };
}
