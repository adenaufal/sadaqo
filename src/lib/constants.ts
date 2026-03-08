export const APP_NAME = 'ZakatFlow';
export const APP_DESCRIPTION =
  'Platform paling mudah untuk masjid dan komunitas meluncurkan kampanye fundraising Ramadhan yang transparan.';

export const CAMPAIGN_TYPES = [
  { value: 'zakat_fitrah', label: 'Zakat Fitrah' },
  { value: 'zakat_mal', label: 'Zakat Mal' },
  { value: 'infaq', label: 'Infaq' },
  { value: 'sedekah', label: 'Sedekah' },
  { value: 'wakaf', label: 'Wakaf' },
  { value: 'qurban', label: 'Qurban' },
  { value: 'umum', label: 'Umum' },
] as const;

export const DONATION_TYPES = [
  { value: 'zakat_fitrah', label: 'Zakat Fitrah' },
  { value: 'zakat_mal', label: 'Zakat Mal' },
  { value: 'zakat_profesi', label: 'Zakat Profesi' },
  { value: 'infaq', label: 'Infaq' },
  { value: 'sedekah', label: 'Sedekah' },
  { value: 'wakaf', label: 'Wakaf' },
  { value: 'umum', label: 'Umum' },
] as const;

export const QUICK_AMOUNTS = [
  25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000,
] as const;

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Kampanye', href: '/kampanye', icon: 'Megaphone' },
  { label: 'Donatur', href: '/donatur', icon: 'Users' },
  { label: 'Transaksi', href: '/transaksi', icon: 'Receipt' },
  { label: 'Pengaturan', href: '/pengaturan', icon: 'Settings' },
] as const;

export type CampaignType = (typeof CAMPAIGN_TYPES)[number]['value'];
export type DonationType = (typeof DONATION_TYPES)[number]['value'];
