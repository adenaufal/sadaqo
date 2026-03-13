# Product Marketing Context

*Last updated: 2026-03-08*

---

## Product Overview

**One-liner:**
Platform paling mudah untuk masjid dan komunitas Muslim mengelola kampanye zakat & donasi secara transparan.

**What it does:**
Sadaqo memungkinkan pengurus masjid dan komunitas Muslim membuat kampanye fundraising (zakat, infaq, sedekah, wakaf, qurban) dalam hitungan menit. Platform ini dilengkapi kalkulator zakat terintegrasi, dashboard real-time, dan halaman transparansi publik — semua tanpa keahlian teknis apapun. Pembayaran diproses via Mayar yang mendukung semua metode populer Indonesia.

**Product category:**
Platform donasi & fundraising islami / Islamic charity management platform

**Product type:**
SaaS web platform (Next.js, Supabase backend, Mayar payment gateway)

**Business model:**
Gratis untuk mulai; revenue via payment processing (melalui Mayar). Tidak ada setup fee, tidak perlu kartu kredit.

---

## Target Audience

**Target users:**
- Pengurus masjid (mosque administrators) — mengelola zakat fitrah & infaq Ramadhan
- Panitia qurban — membuka donasi qurban dengan target dan progres transparan
- Komunitas Muslim / organisasi sosial Islam — galang dana sedekah dan wakaf
- Individu donatur / muzakki — ingin hitung zakat dan bayar langsung

**Decision-makers:**
Ketua DKM (Dewan Kemakmuran Masjid), bendahara masjid, panitia Ramadhan, ketua komunitas Muslim

**Primary use case:**
Pengurus masjid yang ingin membuat kampanye zakat Ramadhan yang profesional dan transparan — bisa dibagikan ke jamaah via WhatsApp — tanpa harus paham teknologi atau menyewa developer.

**Jobs to be done:**
- "Saya perlu cara cepat untuk membuka donasi zakat fitrah yang bisa langsung dibagikan ke grup WhatsApp jamaah"
- "Saya ingin donatur bisa lihat sendiri progres pengumpulan dana, biar mereka percaya"
- "Saya butuh sistem yang otomatis rekap siapa saja yang sudah bayar zakat"

**Use cases:**
- Kampanye Zakat Fitrah Ramadhan
- Kampanye Zakat Mal & Zakat Profesi
- Donasi Infaq & Sedekah harian/mingguan
- Dana Wakaf produktif komunitas
- Donasi Qurban dengan target dan slot kuota
- Fundraising Dana Umum kegiatan masjid

---

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Ketua DKM / Bendahara | Kepercayaan jamaah, akuntabilitas dana | Rekap manual di spreadsheet, laporan tidak rapi, jamaah tidak tahu progress | Transparansi otomatis, laporan real-time, jamaah bisa cek sendiri |
| Panitia Qurban | Target terkumpul, koordinasi donatur | Susah track siapa sudah bayar, tidak ada halaman resmi untuk disebarkan | Halaman kampanye profesional + database donatur otomatis |
| Donatur / Muzakki | Kewajiban zakat terpenuhi, amanah tersalur | Tidak tahu berapa zakat yang harus dibayar, tidak yakin dana tersalur | Kalkulator zakat + bukti transparansi publik |

---

## Problems & Pain Points

**Core problem:**
Pengelolaan zakat dan donasi di masjid masih manual — spreadsheet, chat WhatsApp, catatan fisik — sehingga tidak transparan, susah dikelola, dan kurang profesional.

**Why alternatives fall short:**
- Spreadsheet/manual: tidak real-time, tidak bisa dibagikan, tidak ada payment integration
- Platform donasi umum (Kitabisa, dll): tidak ada fitur khusus zakat (kalkulator, jenis zakat), tidak fokus untuk kebutuhan masjid
- Bangun sendiri: butuh developer, mahal, lama
- Transfer bank biasa: tidak ada rekap donatur, tidak ada transparansi publik

**What it costs them:**
- Waktu berjam-jam merekap donasi manual setiap hari
- Kepercayaan jamaah yang turun karena kurang transparan
- Kesempatan donasi yang hilang karena tidak ada halaman yang bisa disebarkan

**Emotional tension:**
"Takut jamaah tidak percaya karena tidak ada laporan yang jelas." / "Malu kalau kampanye terlihat amatir."

---

## Competitive Landscape

**Direct:** Kitabisa, Yatim Mandiri, Baznas digital — lebih fokus NGO/lembaga besar, bukan untuk masjid kecil/komunitas; tidak ada fitur kalkulator zakat terintegrasi; proses onboarding panjang.

**Secondary:** Google Forms + Spreadsheet + Transfer Bank — gratis tapi manual total, tidak ada real-time update, tidak bisa share link kampanye yang proper.

**Indirect:** WhatsApp group saja — hanya bisa terima konfirmasi manual, tidak ada rekap otomatis, tidak transparan ke publik.

---

## Differentiation

**Key differentiators:**
- Satu-satunya platform donasi dengan kalkulator zakat (fitrah, mal, profesi) terintegrasi langsung di halaman kampanye
- Halaman transparansi publik otomatis — siapa saja bisa cek progres tanpa login
- Desain khusus untuk ekosistem masjid (terminologi, jenis donasi, flow sesuai kebutuhan lokal)
- WhatsApp-first sharing — satu klik pesan sudah diformat rapi
- Onboarding 30 detik, zero technical skill required

**How we do it differently:**
Bukan platform donasi generik — Sadaqo dirancang dari awal khusus untuk kebutuhan zakat dan fundraising islami di Indonesia, dengan terminologi dan flow yang familiar bagi pengurus masjid.

**Why customers choose us:**
"Gratis, langsung jadi, bisa langsung disebarkan ke jamaah, dan jamaah bisa lihat sendiri progressnya."

---

## Objections

| Objection | Response |
|-----------|----------|
| "Apakah aman? Uangnya ke mana?" | Pembayaran diproses langsung via Mayar ke rekening masjid. Sadaqo tidak pegang dana donatur sama sekali. |
| "Kami tidak paham teknologi" | Daftar 30 detik, buat kampanye dalam 5 menit. Tidak butuh pengalaman teknis apapun. Ini lebih mudah dari buat status WhatsApp. |
| "Kampanye kami kecil, apakah cocok?" | Justru untuk komunitas kecil ini paling berguna — bisa terlihat profesional seperti lembaga besar tanpa biaya sama sekali. |

**Anti-persona:**
- Lembaga zakat nasional besar (BAZNAS, LAZ) yang butuh fitur enterprise & compliance khusus
- Platform e-commerce yang ingin tambah fitur donasi sebagai add-on
- Donatur yang hanya ingin bayar sekali tanpa perlu akun

---

## Switching Dynamics

**Push (frustrasi dari solusi lama):**
Capek merekap manual di spreadsheet, malu kampanye terlihat amatir, khawatir jamaah tidak percaya tanpa laporan yang jelas

**Pull (yang menarik ke Sadaqo):**
Halaman kampanye profesional siap pakai, transparansi otomatis, kalkulator zakat bawaan, sharing WhatsApp satu klik

**Habit (yang membuat mereka tetap dengan cara lama):**
"Sudah terbiasa pakai WhatsApp group dan transfer bank", "Takut ribet pindah ke sistem baru", "Nanti-nanti saja, sekarang masih bisa manual"

**Anxiety (kekhawatiran switching):**
"Bagaimana kalau sistem down waktu Ramadhan?", "Kalau ada masalah pembayaran siapa yang tanggung jawab?", "Jamaah kami tidak semua melek teknologi"

---

## Customer Language

**How they describe the problem:**
- "Ribet banget rekap siapa yang sudah bayar zakat"
- "Jamaah tanya terus sudah terkumpul berapa, kami sendiri tidak tahu real-time"
- "Kampanye kami kayak kurang profesional dibanding masjid lain"
- "Susah bukti ke jamaah bahwa dana dikelola dengan amanah"

**How they describe us:**
- "Kayak punya website donasi sendiri tapi gratis"
- "Bisa langsung share ke WhatsApp, jamaah langsung bisa bayar"
- "Transparan, jamaah bisa lihat sendiri progressnya"

**Words to use:**
- Amanah, transparan, mudah, real-time, jamaah, muzakki
- "Hitungan menit", "tanpa keahlian teknis", "gratis"
- Kampanye, zakat, infaq, sedekah, wakaf, qurban

**Words to avoid:**
- "Software", "aplikasi enterprise", "platform SaaS" (terlalu teknis)
- "Subscription", "fee bulanan" (kesan bayar mahal)
- Jargon teknologi yang tidak familiar bagi DKM

**Glossary:**
| Term | Meaning |
|------|---------|
| Muzakki | Donatur / orang yang membayar zakat |
| DKM | Dewan Kemakmuran Masjid — pengurus masjid |
| Zakat Fitrah | Zakat wajib di bulan Ramadhan (per jiwa) |
| Zakat Mal | Zakat atas harta/kekayaan |
| Zakat Profesi | Zakat atas penghasilan/gaji |
| Infaq | Sumbangan sukarela untuk keperluan masjid |
| Wakaf | Sedekah jariyah aset produktif |
| Qurban | Penyembelihan hewan di Hari Raya Idul Adha |
| Kampanye | Halaman fundraising / campaign page |
| Mayar | Payment gateway yang digunakan Sadaqo |

---

## Brand Voice

**Tone:**
Hangat, religius tapi tidak kaku, mudah dipahami semua kalangan

**Style:**
Langsung ke manfaat, bahasa Indonesia yang natural dan tidak terlalu formal, sedikit sentuhan religius (amanah, berkah, jariyah)

**Personality:**
- Amanah (trustworthy)
- Sederhana (tidak ribet)
- Profesional tapi merakyat
- Religius tapi inklusif
- Bersemangat membantu umat

---

## Proof Points

**Metrics:**
- Daftar dalam 30 detik
- Kampanye siap dibagikan dalam hitungan menit
- Kalkulator 3 jenis zakat (fitrah, mal, profesi)
- Update donasi real-time
- 100% transparansi publik

**Payment methods supported (via Mayar):**
Transfer Bank, QRIS, GoPay, OVO, Dana, ShopeePay, Kartu Kredit, dan lainnya

**Customers:**
*(Hackathon project — belum ada customer live, data akan diupdate setelah launch)*

**Value themes:**
| Theme | Proof |
|-------|-------|
| Mudah & Cepat | Daftar 30 detik, kampanye siap menit itu juga |
| Transparan | Halaman publik otomatis, siapa saja bisa cek |
| Amanah | Dana langsung ke rekening masjid via Mayar, bukan ditampung Sadaqo |
| Gratis | Tidak ada biaya setup, tidak perlu kartu kredit |

---

## Goals

**Business goal:**
Menjadi platform manajemen zakat & donasi #1 untuk masjid dan komunitas Muslim Indonesia

**Conversion action:**
Daftar gratis → Buat kampanye pertama → Bagikan ke jamaah

**Current metrics:**
*(Hackathon project — melacak registrasi, kampanye dibuat, dan total donasi terkumpul)*
