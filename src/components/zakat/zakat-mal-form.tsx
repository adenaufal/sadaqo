'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { hitungZakatMal, ZAKAT_CONSTANTS } from '@/lib/zakat';
import { formatRupiah } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Landmark, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface ZakatMalFormProps {
  onCalculate?: (amount: number, type: string) => void;
  showPayButton?: boolean;
}

export function ZakatMalForm({ onCalculate, showPayButton }: ZakatMalFormProps) {
  const [totalHarta, setTotalHarta] = useState(0);
  const [totalUtang, setTotalUtang] = useState(0);
  const [hargaEmas, setHargaEmas] = useState(ZAKAT_CONSTANTS.GOLD_PRICE_PER_GRAM);
  const [result, setResult] = useState<ReturnType<typeof hitungZakatMal> | null>(null);

  const calculate = () => {
    const res = hitungZakatMal({
      totalHarta,
      totalUtang,
      hargaEmasPerGram: hargaEmas,
    });
    setResult(res);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="totalHarta" className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-primary" />
            Total Harta (Tabungan + Investasi + Emas + Properti)
          </Label>
          <Input
            id="totalHarta"
            type="number"
            min={0}
            value={totalHarta || ''}
            onChange={(e) => setTotalHarta(Number(e.target.value))}
            className="h-11"
            placeholder="Contoh: 200000000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalUtang" className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-primary" />
            Total Utang / Kewajiban
          </Label>
          <Input
            id="totalUtang"
            type="number"
            min={0}
            value={totalUtang || ''}
            onChange={(e) => setTotalUtang(Number(e.target.value))}
            className="h-11"
            placeholder="Contoh: 50000000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hargaEmas">Harga Emas per Gram (Rp)</Label>
          <Input
            id="hargaEmas"
            type="number"
            min={0}
            value={hargaEmas}
            onChange={(e) => setHargaEmas(Number(e.target.value))}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Nisab: {ZAKAT_CONSTANTS.NISAB_GOLD_GRAMS} gram emas = {formatRupiah(ZAKAT_CONSTANTS.NISAB_GOLD_GRAMS * hargaEmas)}
          </p>
        </div>
      </div>

      <Button onClick={calculate} className="w-full h-11 gradient-emerald text-white">
        Hitung Zakat Mal
      </Button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className={`border-${result.wajibZakat ? 'primary' : 'warning'}/20 bg-${result.wajibZakat ? 'primary' : 'warning'}/5`}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  {result.wajibZakat ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className={`font-semibold text-sm ${result.wajibZakat ? 'text-primary' : 'text-yellow-600'}`}>
                    {result.wajibZakat ? 'Wajib Zakat' : 'Belum Wajib Zakat'}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className={`text-3xl font-bold font-heading ${result.wajibZakat ? 'text-primary' : 'text-yellow-600'}`}>
                    {formatRupiah(result.total)}
                  </p>
                  <p className="text-sm text-muted-foreground">{result.detail}</p>
                  <p className="text-xs text-muted-foreground">
                    Nisab: {formatRupiah(result.nisab)}
                  </p>
                </div>
                {showPayButton && result.wajibZakat && result.total > 0 && (
                  <Button
                    className="w-full mt-4 gradient-emerald text-white"
                    onClick={() => onCalculate?.(result.total, 'zakat_mal')}
                  >
                    Bayar Zakat Mal
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
