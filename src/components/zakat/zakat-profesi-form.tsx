'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { hitungZakatProfesi, ZAKAT_CONSTANTS } from '@/lib/zakat';
import { formatRupiah } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface ZakatProfesiFormProps {
  onCalculate?: (amount: number, type: string) => void;
  showPayButton?: boolean;
}

export function ZakatProfesiForm({ onCalculate, showPayButton }: ZakatProfesiFormProps) {
  const [penghasilan, setPenghasilan] = useState(0);
  const [hargaEmas, setHargaEmas] = useState(ZAKAT_CONSTANTS.GOLD_PRICE_PER_GRAM);
  const [result, setResult] = useState<ReturnType<typeof hitungZakatProfesi> | null>(null);

  const calculate = () => {
    const res = hitungZakatProfesi({
      penghasilanBulanan: penghasilan,
      hargaEmasPerGram: hargaEmas,
    });
    setResult(res);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="penghasilan" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Penghasilan Bulanan (Rp)
          </Label>
          <Input
            id="penghasilan"
            type="number"
            min={0}
            value={penghasilan || ''}
            onChange={(e) => setPenghasilan(Number(e.target.value))}
            className="h-11"
            placeholder="Contoh: 10000000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hargaEmasProfesi">Harga Emas per Gram (Rp)</Label>
          <Input
            id="hargaEmasProfesi"
            type="number"
            min={0}
            value={hargaEmas}
            onChange={(e) => setHargaEmas(Number(e.target.value))}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Nisab bulanan: {formatRupiah(Math.round((ZAKAT_CONSTANTS.NISAB_GOLD_GRAMS * hargaEmas) / 12))}
          </p>
        </div>
      </div>

      <Button onClick={calculate} className="w-full h-11 gradient-emerald text-white">
        Hitung Zakat Profesi
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
                    {result.wajibZakat && <span className="text-base font-normal text-muted-foreground">/bulan</span>}
                  </p>
                  <p className="text-sm text-muted-foreground">{result.detail}</p>
                </div>
                {showPayButton && result.wajibZakat && result.total > 0 && (
                  <Button
                    className="w-full mt-4 gradient-emerald text-white"
                    onClick={() => onCalculate?.(result.total, 'zakat_profesi')}
                  >
                    Bayar Zakat Profesi
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
