'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ZakatFitrahForm } from './zakat-fitrah-form';
import { ZakatMalForm } from './zakat-mal-form';
import { ZakatProfesiForm } from './zakat-profesi-form';

interface ZakatCalculatorProps {
  onCalculate?: (amount: number, type: string) => void;
  showPayButton?: boolean;
}

export function ZakatCalculator({ onCalculate, showPayButton = false }: ZakatCalculatorProps) {
  const [activeTab, setActiveTab] = useState('fitrah');

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="fitrah" className="text-sm font-medium">
            Zakat Fitrah
          </TabsTrigger>
          <TabsTrigger value="mal" className="text-sm font-medium">
            Zakat Mal
          </TabsTrigger>
          <TabsTrigger value="profesi" className="text-sm font-medium">
            Zakat Profesi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fitrah" className="mt-6">
          <ZakatFitrahForm onCalculate={onCalculate} showPayButton={showPayButton} />
        </TabsContent>

        <TabsContent value="mal" className="mt-6">
          <ZakatMalForm onCalculate={onCalculate} showPayButton={showPayButton} />
        </TabsContent>

        <TabsContent value="profesi" className="mt-6">
          <ZakatProfesiForm onCalculate={onCalculate} showPayButton={showPayButton} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
