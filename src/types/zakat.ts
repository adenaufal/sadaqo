export interface ZakatFitrahInput {
  jumlahAnggota: number;
  hargaBerasPerKg: number;
}

export interface ZakatFitrahResult {
  total: number;
  perOrang: number;
  detail: string;
}

export interface ZakatMalInput {
  totalHarta: number;
  totalUtang: number;
  hargaEmasPerGram: number;
}

export interface ZakatMalResult {
  total: number;
  nisab: number;
  wajibZakat: boolean;
  detail: string;
}

export interface ZakatProfesiInput {
  penghasilanBulanan: number;
  hargaEmasPerGram: number;
}

export interface ZakatProfesiResult {
  total: number;
  nisab: number;
  wajibZakat: boolean;
  detail: string;
}

export type ZakatType = 'fitrah' | 'mal' | 'profesi';
