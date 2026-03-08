export const ZAKAT_CONSTANTS = {
  FITRAH_KG_PER_PERSON: 2.5,
  DEFAULT_RICE_PRICE_PER_KG: 18000,
  MAL_PERCENTAGE: 0.025,
  GOLD_PRICE_PER_GRAM: 1500000,
  NISAB_GOLD_GRAMS: 85,
  PROFESI_PERCENTAGE: 0.025,
};

export interface ZakatFitrahInput {
  jumlahAnggota: number;
  hargaBerasPerKg: number;
}

export interface ZakatMalInput {
  totalHarta: number;
  totalUtang: number;
  hargaEmasPerGram: number;
}

export interface ZakatProfesiInput {
  penghasilanBulanan: number;
  hargaEmasPerGram: number;
}

export function hitungZakatFitrah(input: ZakatFitrahInput): {
  total: number;
  perOrang: number;
  detail: string;
} {
  const perOrang = input.hargaBerasPerKg * ZAKAT_CONSTANTS.FITRAH_KG_PER_PERSON;
  const total = perOrang * input.jumlahAnggota;
  return {
    total,
    perOrang,
    detail: `${input.jumlahAnggota} orang × ${ZAKAT_CONSTANTS.FITRAH_KG_PER_PERSON} kg × Rp ${input.hargaBerasPerKg.toLocaleString('id-ID')} = Rp ${total.toLocaleString('id-ID')}`,
  };
}

export function hitungZakatMal(input: ZakatMalInput): {
  total: number;
  nisab: number;
  wajibZakat: boolean;
  detail: string;
} {
  const nisab = ZAKAT_CONSTANTS.NISAB_GOLD_GRAMS * input.hargaEmasPerGram;
  const hartaBersih = input.totalHarta - input.totalUtang;
  const wajibZakat = hartaBersih >= nisab;
  const total = wajibZakat ? Math.round(hartaBersih * ZAKAT_CONSTANTS.MAL_PERCENTAGE) : 0;
  return {
    total,
    nisab,
    wajibZakat,
    detail: wajibZakat
      ? `2.5% × Rp ${hartaBersih.toLocaleString('id-ID')} = Rp ${total.toLocaleString('id-ID')}`
      : `Harta bersih (Rp ${hartaBersih.toLocaleString('id-ID')}) belum mencapai nisab (Rp ${nisab.toLocaleString('id-ID')})`,
  };
}

export function hitungZakatProfesi(input: ZakatProfesiInput): {
  total: number;
  nisab: number;
  wajibZakat: boolean;
  detail: string;
} {
  const nisabBulanan = (ZAKAT_CONSTANTS.NISAB_GOLD_GRAMS * input.hargaEmasPerGram) / 12;
  const wajibZakat = input.penghasilanBulanan >= nisabBulanan;
  const total = wajibZakat ? Math.round(input.penghasilanBulanan * ZAKAT_CONSTANTS.PROFESI_PERCENTAGE) : 0;
  return {
    total,
    nisab: nisabBulanan,
    wajibZakat,
    detail: wajibZakat
      ? `2.5% × Rp ${input.penghasilanBulanan.toLocaleString('id-ID')} = Rp ${total.toLocaleString('id-ID')}/bulan`
      : `Penghasilan belum mencapai nisab bulanan (Rp ${nisabBulanan.toLocaleString('id-ID')})`,
  };
}
