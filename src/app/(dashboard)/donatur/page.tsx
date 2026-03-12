import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { formatRupiah } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donatur',
};

export default async function DonaturPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Get campaign IDs belonging to this user
  const { data: campaigns } = await (supabase as any)
    .from('campaigns')
    .select('id')
    .eq('user_id', user.id) as { data: { id: string }[] | null };

  const campaignIds = campaigns?.map((c) => c.id) ?? [];

  // Fetch paid donations grouped by donor identity
  const { data: donations } = await (supabase
    .from('donations') as any)
    .select('donor_name, donor_email, donor_phone, amount, paid_at')
    .in('campaign_id', campaignIds.length > 0 ? campaignIds : ['00000000-0000-0000-0000-000000000000'])
    .eq('payment_status', 'paid')
    .order('paid_at', { ascending: false }) as { data: { donor_name: string; donor_email: string | null; donor_phone: string | null; amount: number; paid_at: string | null }[] | null };

  // Aggregate by donor identity (name + email combination)
  const donorMap = new Map<string, {
    name: string;
    email: string | null;
    phone: string | null;
    total_donated: number;
    donation_count: number;
    last_donation_at: string | null;
  }>();

  for (const d of donations ?? []) {
    const key = `${d.donor_name}||${d.donor_email || ''}`;
    const existing = donorMap.get(key);
    if (existing) {
      existing.total_donated += d.amount || 0;
      existing.donation_count += 1;
      if (d.paid_at && (!existing.last_donation_at || d.paid_at > existing.last_donation_at)) {
        existing.last_donation_at = d.paid_at;
      }
    } else {
      donorMap.set(key, {
        name: d.donor_name || 'Hamba Allah',
        email: d.donor_email,
        phone: d.donor_phone,
        total_donated: d.amount || 0,
        donation_count: 1,
        last_donation_at: d.paid_at,
      });
    }
  }

  const donors = Array.from(donorMap.values()).sort((a, b) => b.total_donated - a.total_donated);
  const totalDonors = donors.length;
  const totalDonated = donors.reduce((sum, d) => sum + d.total_donated, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Donatur</h1>
        <p className="text-muted-foreground text-sm">Database muzakki & donatur Anda</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Donatur</p>
                <p className="text-lg font-bold font-heading">{totalDonors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Donasi Masuk</p>
                <p className="text-lg font-bold font-heading">{formatRupiah(totalDonated)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donor Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-heading">Daftar Donatur</CardTitle>
        </CardHeader>
        <CardContent>
          {donors.length === 0 ? (
            <div className="text-center py-14">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400/50" />
              </div>
              <p className="font-semibold text-foreground/70">
                Donatur pertama akan jadi yang paling berkesan ✨
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                Setiap muzakki yang berdonasi otomatis tercatat di sini. Nama mereka tersimpan, pahala mereka terjaga.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telepon</TableHead>
                    <TableHead>Total Donasi</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Terakhir</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donors.map((donor, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{donor.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {donor.email || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {donor.phone || '-'}
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {formatRupiah(donor.total_donated)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {donor.donation_count}x
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {donor.last_donation_at
                          ? format(new Date(donor.last_donation_at), 'dd MMM yyyy', { locale: idLocale })
                          : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
