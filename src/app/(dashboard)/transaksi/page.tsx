import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { formatRupiah } from '@/lib/utils';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type Donation = Database['public']['Tables']['donations']['Row'];
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Receipt, Wallet, CheckCircle, Clock as ClockIcon } from 'lucide-react';
import { BuktiZakatButton } from '@/components/dashboard/bukti-zakat-button';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transaksi',
};

export default async function TransaksiPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Get all campaigns for this user to fetch their donations
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('id, title')
    .eq('user_id', user.id) as { data: Pick<Campaign, 'id' | 'title'>[] | null };

  const campaignIds = campaigns?.map((c) => c.id) || [];
  const campaignMap = new Map(campaigns?.map((c) => [c.id, c.title]) || []);

  let donations: Donation[] = [];
  if (campaignIds.length > 0) {
    const { data } = await supabase
      .from('donations')
      .select('*')
      .in('campaign_id', campaignIds)
      .order('created_at', { ascending: false })
      .limit(100) as { data: Donation[] | null };
    donations = data || [];
  }

  const totalPaid = donations.filter((d) => d.payment_status === 'paid').reduce((sum, d) => sum + d.amount, 0);
  const totalPending = donations.filter((d) => d.payment_status === 'pending').reduce((sum, d) => sum + d.amount, 0);

  const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    paid: { label: 'Lunas', variant: 'default' },
    pending: { label: 'Menunggu', variant: 'outline' },
    failed: { label: 'Gagal', variant: 'destructive' },
    expired: { label: 'Kadaluarsa', variant: 'secondary' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Transaksi</h1>
        <p className="text-muted-foreground text-sm">Riwayat semua donasi masuk</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Masuk</p>
                <p className="text-lg font-bold font-heading">{formatRupiah(totalPaid)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Menunggu Bayar</p>
                <p className="text-lg font-bold font-heading">{formatRupiah(totalPending)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Transaksi</p>
                <p className="text-lg font-bold font-heading">{donations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-heading">Semua Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          {donations.length === 0 ? (
            <div className="text-center py-14">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-primary/30" />
              </div>
              <p className="font-semibold text-foreground/70">Donasi pertama sedang dalam perjalanan 🌙</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                Bagikan link kampanye ke jamaah — setiap transaksi akan muncul di sini secara real-time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donatur</TableHead>
                    <TableHead>Kampanye</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((d) => {
                    const status = statusConfig[d.payment_status || 'pending'] || statusConfig.pending;
                    return (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium text-sm">
                          {d.is_anonymous ? 'Hamba Allah' : d.donor_name}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground truncate max-w-[150px]">
                          {campaignMap.get(d.campaign_id) || '-'}
                        </TableCell>
                        <TableCell className="font-semibold text-sm">
                          {formatRupiah(d.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {d.donation_type.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={status.variant} className="text-xs">
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {d.created_at
                            ? format(new Date(d.created_at), 'dd MMM yyyy HH:mm', { locale: idLocale })
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {d.payment_status === 'paid' && (
                            <BuktiZakatButton
                              donorName={d.is_anonymous ? 'Hamba Allah' : d.donor_name}
                              donorEmail={d.donor_email}
                              donorPhone={d.donor_phone}
                              amount={d.amount}
                              donationType={d.donation_type}
                              campaignTitle={campaignMap.get(d.campaign_id) || 'Kampanye'}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
