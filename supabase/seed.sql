-- ============================================
-- Sadaqo Demo Seed Data
-- Run this AFTER the initial schema migration
-- ============================================

-- NOTE: Replace 'DEMO_USER_ID' with an actual auth.users UUID
-- after creating an admin account via the app.
-- You can find it in Supabase Dashboard > Authentication > Users

-- For demo purposes, we'll use a placeholder that you replace:
-- Step 1: Create an account at /register
-- Step 2: Copy the user UUID from Supabase Auth dashboard
-- Step 3: Replace all instances of DEMO_USER_ID below

-- ============================================
-- Demo Campaigns
-- ============================================

-- Campaign 1: Zakat Fitrah (74% funded)
INSERT INTO public.campaigns (
  id, user_id, title, slug, description, campaign_type,
  target_amount, collected_amount, donor_count,
  beneficiary_story, start_date, end_date, is_active
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'DEMO_USER_ID',
  'Zakat Fitrah Ramadhan 1447H — Masjid Al-Ikhlas',
  'zakat-fitrah-ramadhan-1447h-masjid-al-ikhlas',
  'Ayo tunaikan zakat fitrah Ramadhan 1447H bersama Masjid Al-Ikhlas. Dana zakat akan disalurkan langsung kepada mustahik di sekitar masjid sebelum Hari Raya Idul Fitri.',
  'zakat_fitrah',
  25000000,
  18500000,
  42,
  'Tahun lalu, zakat fitrah dari jamaah Masjid Al-Ikhlas berhasil membantu 150 keluarga kurang mampu di kelurahan kita. Tahun ini, kami menargetkan untuk menjangkau lebih banyak keluarga yang membutuhkan.',
  NOW() - INTERVAL '15 days',
  NOW() + INTERVAL '15 days',
  TRUE
);

-- Campaign 2: Infaq Pembangunan (24% funded)
INSERT INTO public.campaigns (
  id, user_id, title, slug, description, campaign_type,
  target_amount, collected_amount, donor_count,
  beneficiary_story, start_date, end_date, is_active
) VALUES (
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'DEMO_USER_ID',
  'Infaq Pembangunan Mushola Desa Sukamaju',
  'infaq-pembangunan-mushola-desa-sukamaju',
  'Mari bersama-sama membangun mushola di Desa Sukamaju yang telah lama diimpikan warga. Mushola ini akan menjadi pusat ibadah dan pendidikan Al-Quran bagi anak-anak desa.',
  'infaq',
  50000000,
  12000000,
  28,
  'Desa Sukamaju belum memiliki tempat ibadah yang layak. Saat ini warga shalat berjamaah di rumah warga bergantian. Dengan mushola baru, anak-anak bisa belajar mengaji dan warga punya tempat ibadah yang nyaman.',
  NOW() - INTERVAL '30 days',
  NOW() + INTERVAL '60 days',
  TRUE
);

-- Campaign 3: Sedekah Buka Puasa (100% funded - completed!)
INSERT INTO public.campaigns (
  id, user_id, title, slug, description, campaign_type,
  target_amount, collected_amount, donor_count,
  beneficiary_story, start_date, end_date, is_active
) VALUES (
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'DEMO_USER_ID',
  'Sedekah Buka Puasa 1000 Paket',
  'sedekah-buka-puasa-1000-paket',
  'Program buka puasa gratis untuk 1000 paket selama bulan Ramadhan. Setiap paket berisi nasi kotak lengkap dengan lauk pauk dan minuman untuk berbuka puasa.',
  'sedekah',
  15000000,
  15000000,
  65,
  'Setiap hari selama Ramadhan, relawan kami mendistribusikan paket buka puasa ke ojol, petugas kebersihan, pedagang kaki lima, dan warga kurang mampu di sekitar masjid. Alhamdulillah target sudah tercapai!',
  NOW() - INTERVAL '20 days',
  NOW() + INTERVAL '10 days',
  TRUE
);

-- ============================================
-- Demo Donations (for Campaign 1 - Zakat Fitrah)
-- ============================================

INSERT INTO public.donations (campaign_id, donor_name, donor_email, amount, donation_type, is_anonymous, message, payment_status, paid_at) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ahmad Hidayat', 'ahmad@example.com', 500000, 'zakat_fitrah', FALSE, 'Semoga berkah Ramadhan ini', 'paid', NOW() - INTERVAL '12 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Siti Nurhaliza', 'siti@example.com', 1000000, 'zakat_fitrah', FALSE, 'Untuk keluarga 5 orang', 'paid', NOW() - INTERVAL '10 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Hamba Allah', NULL, 2000000, 'zakat_fitrah', TRUE, 'Bismillah', 'paid', NOW() - INTERVAL '8 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Budi Santoso', 'budi@example.com', 750000, 'zakat_fitrah', FALSE, 'Zakat fitrah keluarga', 'paid', NOW() - INTERVAL '7 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Fatimah Zahra', 'fatimah@example.com', 250000, 'zakat_fitrah', FALSE, NULL, 'paid', NOW() - INTERVAL '5 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Hamba Allah', NULL, 5000000, 'zakat_fitrah', TRUE, 'Semoga diterima', 'paid', NOW() - INTERVAL '3 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Rizki Pratama', 'rizki@example.com', 3000000, 'zakat_fitrah', FALSE, 'Alhamdulillah bisa membantu', 'paid', NOW() - INTERVAL '2 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Dewi Lestari', 'dewi@example.com', 1500000, 'zakat_fitrah', FALSE, 'Ramadhan Mubarak', 'paid', NOW() - INTERVAL '1 day'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Hamba Allah', NULL, 4500000, 'zakat_fitrah', TRUE, NULL, 'paid', NOW() - INTERVAL '12 hours');

-- Demo Donations (for Campaign 2 - Infaq Pembangunan)
INSERT INTO public.donations (campaign_id, donor_name, donor_email, amount, donation_type, is_anonymous, message, payment_status, paid_at) VALUES
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'H. Muhammad Yusuf', 'yusuf@example.com', 5000000, 'infaq', FALSE, 'Untuk pembangunan mushola', 'paid', NOW() - INTERVAL '25 days'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Keluarga Besar Hakim', 'hakim@example.com', 3000000, 'infaq', FALSE, 'Semoga menjadi amal jariyah', 'paid', NOW() - INTERVAL '20 days'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Hamba Allah', NULL, 2000000, 'infaq', TRUE, NULL, 'paid', NOW() - INTERVAL '15 days'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Aisyah Putri', 'aisyah@example.com', 1000000, 'infaq', FALSE, 'Insya Allah berkah', 'paid', NOW() - INTERVAL '10 days'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Umar Faruq', 'umar@example.com', 1000000, 'infaq', FALSE, 'Amal jariyah dunia akhirat', 'paid', NOW() - INTERVAL '5 days');

-- Demo Donations (for Campaign 3 - Sedekah Buka Puasa - fully funded)
INSERT INTO public.donations (campaign_id, donor_name, donor_email, amount, donation_type, is_anonymous, message, payment_status, paid_at) VALUES
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Majelis Taklim An-Nur', 'annur@example.com', 5000000, 'sedekah', FALSE, 'Untuk program buka puasa', 'paid', NOW() - INTERVAL '18 days'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Hamba Allah', NULL, 3000000, 'sedekah', TRUE, 'Semoga bermanfaat', 'paid', NOW() - INTERVAL '15 days'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Komunitas Peduli Sesama', 'peduli@example.com', 4000000, 'sedekah', FALSE, 'Dari kami untuk mereka yang membutuhkan', 'paid', NOW() - INTERVAL '12 days'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Irfan Hakim', 'irfan@example.com', 2000000, 'sedekah', FALSE, 'Barakallah', 'paid', NOW() - INTERVAL '8 days'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Hamba Allah', NULL, 1000000, 'sedekah', TRUE, NULL, 'paid', NOW() - INTERVAL '4 days');

-- ============================================
-- Demo Donors (muzakki database)
-- ============================================

INSERT INTO public.donors (user_id, name, email, phone, total_donated, donation_count, last_donation_at) VALUES
('DEMO_USER_ID', 'Ahmad Hidayat', 'ahmad@example.com', '081234567890', 500000, 1, NOW() - INTERVAL '12 days'),
('DEMO_USER_ID', 'Siti Nurhaliza', 'siti@example.com', '081234567891', 1000000, 1, NOW() - INTERVAL '10 days'),
('DEMO_USER_ID', 'Budi Santoso', 'budi@example.com', '081234567892', 750000, 1, NOW() - INTERVAL '7 days'),
('DEMO_USER_ID', 'Fatimah Zahra', 'fatimah@example.com', '081234567893', 250000, 1, NOW() - INTERVAL '5 days'),
('DEMO_USER_ID', 'Rizki Pratama', 'rizki@example.com', '081234567894', 3000000, 1, NOW() - INTERVAL '2 days'),
('DEMO_USER_ID', 'Dewi Lestari', 'dewi@example.com', '081234567895', 1500000, 1, NOW() - INTERVAL '1 day'),
('DEMO_USER_ID', 'H. Muhammad Yusuf', 'yusuf@example.com', '081234567896', 5000000, 1, NOW() - INTERVAL '25 days'),
('DEMO_USER_ID', 'Aisyah Putri', 'aisyah@example.com', '081234567897', 1000000, 1, NOW() - INTERVAL '10 days'),
('DEMO_USER_ID', 'Umar Faruq', 'umar@example.com', '081234567898', 1000000, 1, NOW() - INTERVAL '5 days'),
('DEMO_USER_ID', 'Irfan Hakim', 'irfan@example.com', '081234567899', 2000000, 1, NOW() - INTERVAL '8 days');
