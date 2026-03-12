-- ============================================================
-- DEMO SEED: 3 kampanye untuk demo Sadaqo
-- ============================================================
-- CARA PAKAI:
-- 1. Buka Supabase Dashboard → SQL Editor
-- 2. Ganti YOUR_USER_ID_HERE dengan user ID Anda
--    (Temukan di: Authentication → Users → copy UUID)
-- 3. Jalankan script ini
-- ============================================================

DO $$
DECLARE
  v_user_id UUID := '615e950c-062e-44f1-96d9-309db88a3b2b'; -- GANTI INI
BEGIN

INSERT INTO public.campaigns (
  user_id, title, slug, description, campaign_type,
  target_amount, collected_amount, donor_count,
  beneficiary_story, is_active, start_date
) VALUES

-- Kampanye 1: Zakat Fitrah
(
  v_user_id,
  'Zakat Fitrah Ramadhan 1447H — Masjid Al-Ikhlas',
  'zakat-fitrah-1447h-al-ikhlas',
  'Tunaikan zakat fitrah Anda melalui Masjid Al-Ikhlas. Disalurkan langsung kepada mustahik di lingkungan masjid sebelum Shalat Idul Fitri.',
  'zakat_fitrah',
  15000000, -- Rp 15 juta target
  8750000,  -- Rp 8.75 juta sudah terkumpul (58%)
  47,
  'Tahun lalu, zakat fitrah dari jamaah Al-Ikhlas berhasil disalurkan kepada 120 keluarga dhuafa di 3 kelurahan sekitar masjid. Ibu Siti (65 tahun), salah satu penerima manfaat, berkata: "Alhamdulillah, kami bisa merayakan Lebaran dengan layak berkat bantuan jamaah Al-Ikhlas." Tahun ini, kami menargetkan menjangkau 200 keluarga. Setiap Rp 45.000 yang Anda titipkan akan menjadi satu paket zakat fitrah untuk satu jiwa.',
  true,
  NOW() - INTERVAL '7 days'
),

-- Kampanye 2: Infaq Pembangunan
(
  v_user_id,
  'Infaq Pembangunan Mushola Al-Falah',
  'infaq-mushola-al-falah',
  'Mari bersama bangun mushola Al-Falah untuk warga Perumahan Griya Asri yang selama ini harus sholat berjamaah di garasi rumah warga.',
  'infaq',
  50000000, -- Rp 50 juta target
  23400000, -- Rp 23.4 juta sudah terkumpul (47%)
  89,
  'Warga Perumahan Griya Asri (200+ KK) belum memiliki tempat ibadah sejak perumahan dibangun 3 tahun lalu. Setiap Jumat, warga terpaksa sholat di garasi Pak Ahmad yang hanya muat 20 orang — sisanya di pinggir jalan. Pak Ahmad, ketua RT: "Kami sudah kumpulkan dana, tapi baru cukup untuk pondasi. Dengan bantuan donatur, insya Allah mushola bisa berdiri sebelum Ramadhan tahun depan." Dana akan digunakan untuk: pondasi & struktur (Rp 25 juta), dinding & atap (Rp 15 juta), finishing & fasilitas (Rp 10 juta).',
  true,
  NOW() - INTERVAL '14 days'
),

-- Kampanye 3: Sedekah Buka Puasa
(
  v_user_id,
  '1000 Paket Buka Puasa untuk Dhuafa',
  '1000-paket-buka-puasa',
  'Berbagi kebahagiaan Ramadhan melalui 1000 paket buka puasa untuk saudara kita yang membutuhkan di sekitar Masjid Al-Ikhlas.',
  'sedekah',
  25000000, -- Rp 25 juta target
  19800000, -- Rp 19.8 juta sudah terkumpul (79%)
  134,
  'Setiap Ramadhan, ratusan ojol, petugas kebersihan, dan warga kurang mampu di sekitar masjid menunggu waktu berbuka tanpa makanan yang layak. Program 1000 Paket Buka Puasa menyediakan paket nasi kotak lengkap + minuman + kurma setiap hari selama 30 hari Ramadhan. Tahun lalu, 750 paket berhasil dibagikan. Tahun ini kita naikan targetnya. Rp 25.000 = 1 paket buka puasa untuk 1 orang. Bayangkan senyum mereka saat berbuka.',
  true,
  NOW() - INTERVAL '5 days'
);

END $$;
