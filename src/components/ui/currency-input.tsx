'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const fmt = new Intl.NumberFormat('id-ID');

function formatValue(value: number): string {
  return value > 0 ? fmt.format(value) : '';
}

interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: number;
  onChange: (value: number) => void;
}

export function CurrencyInput({
  value,
  onChange,
  className,
  onFocus,
  onBlur,
  ...props
}: CurrencyInputProps) {
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState('');

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setRaw(value > 0 ? value.toString() : '');
      setFocused(true);
      onFocus?.(e);
    },
    [value, onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, '');
      setRaw(digits);
      onChange(digits ? parseInt(digits, 10) : 0);
    },
    [onChange]
  );

  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      value={focused ? raw : formatValue(value)}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(className)}
    />
  );
}
