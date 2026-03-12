'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { hitungZakatFitrah, ZAKAT_CONSTANTS } from '@/lib/zakat';
import { formatRupiah } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Wheat, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CurrencyInput } from '@/components/ui/currency-input';

interface ZakatFitrahFormProps {
  onCalculate?: (amount: number, type: string) => void;
  showPayButton?: boolean;
}

export function ZakatFitrahForm({ onCalculate, showPayButton }: ZakatFitrahFormProps) {
  const [jumlahAnggota, setJumlahAnggota] = useState(1);
  const [hargaBeras, setHargaBeras] = useState(ZAKAT_CONSTANTS.DEFAULT_RICE_PRICE_PER_KG);
  const [result, setResult] = useState<ReturnType<typeof hitungZakatFitrah> | null>(null);

  const calculate = () => {
    const res = hitungZakatFitrah({
      jumlahAnggota,
      hargaBerasPerKg: hargaBeras,
    });
    setResult(res);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jumlahAnggota" className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Jumlah Anggota Keluarga
          </Label>
          <Input
            id="jumlahAnggota"
            type="number"
            min={1}
            value={jumlahAnggota}
            onChange={(e) => setJumlahAnggota(Number(e.target.value))}
            className="h-11"
            placeholder="Contoh: 4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hargaBeras" className="flex items-center gap-2">
            <Wheat className="w-4 h-4 text-primary" />
            Harga Beras per Kg (Rp)
          </Label>
          <CurrencyInput
            id="hargaBeras"
            value={hargaBeras}
            onChange={setHargaBeras}
            className="h-11"
            placeholder="18000"
          />
          <p className="text-xs text-muted-foreground">
            Default: {formatRupiah(ZAKAT_CONSTANTS.DEFAULT_RICE_PRICE_PER_KG)}/kg — sesuaikan dengan harga beras di daerah Anda
          </p>
        </div>
      </div>

      <Button onClick={calculate} className="w-full h-11 gradient-emerald text-white">
        Hitung Zakat Fitrah
      </Button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary text-sm">Hasil Perhitungan</span>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold font-heading text-primary">
                    {formatRupiah(result.total)}
                  </p>
                  <p className="text-sm text-muted-foreground">{result.detail}</p>
                  <p className="text-xs text-muted-foreground">
                    Per orang: {formatRupiah(result.perOrang)}
                  </p>
                </div>
                {showPayButton && result.total > 0 && (
                  <Button
                    className="w-full mt-4 gradient-emerald text-white"
                    onClick={() => onCalculate?.(result.total, 'zakat_fitrah')}
                  >
                    Bayar Zakat Fitrah
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
