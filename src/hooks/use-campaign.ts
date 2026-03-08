'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];

export function useCampaign(slugOrId: string) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchCampaign = async () => {
      const { data, error: fetchError } = await supabase
        .from('campaigns')
        .select('*')
        .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
        .single() as { data: Campaign | null; error: { message: string } | null };

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setCampaign(data);
      }
      setLoading(false);
    };

    fetchCampaign();

    // Real-time subscription for campaign updates (progress bar)
    const channel = supabase
      .channel(`campaign-${slugOrId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'campaigns',
          filter: `slug=eq.${slugOrId}`,
        },
        (payload) => {
          setCampaign(payload.new as Campaign);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slugOrId]);

  return { campaign, loading, error };
}
