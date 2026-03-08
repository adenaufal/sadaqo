import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { formatRupiah } from '@/lib/utils';
import type { Database } from '@/types/database';

type Donor = Database['public']['Tables']['donors']['Row'];
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
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

  // Fetch donors for this user
  const { data: donors } = await supabase
    .from('donors')
    .select('*')
    .eq('user_id', user.id)
    .order('total_donated', { ascending: false }) as { data: Donor[] | null };

  const totalDonors = donors?.length || 0;
  const totalDonated = donors?.reduce((sum, d) => sum + (d.total_donated || 0), 0) || 0;

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
          {!donors || donors.length === 0 ? (
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
                  {donors.map((donor) => (
                    <TableRow key={donor.id}>
                      <TableCell className="font-medium">{donor.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {donor.email || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {donor.phone || '-'}
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {formatRupiah(donor.total_donated || 0)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {donor.donation_count || 0}x
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
