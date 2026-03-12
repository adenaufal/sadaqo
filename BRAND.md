# Sadaqo — Brand Guide

> Generated: 2026-03-13 | Status: Active

---

## Nama Brand

**Sadaqo**
`sa-DA-qo` · 3 suku kata · [sadaqo.id](https://sadaqo.id)

### Asal & Makna
Portmanteau modern dari **Shadaqah/Sedekah** (صدقة) — voluntary charity dalam Islam — dengan ejaan yang segar dan app-native. Akar kata "sadaqa" (صدق) berarti *kebenaran dan kejujuran*, bukan sekadar "memberi". Memberi karena benar-benar percaya.

Indonesian Muslims mengenali akarnya langsung. Ejaan "-qo" memberinya identitas produk yang distinktif — seperti "Tokopedia" terasa lokal tapi modern.

### Mengapa Bukan AmanahFlow
| Layer | AmanahFlow | Sadaqo |
|-------|-----------|--------|
| Sound | 4 suku kata, dua register berbeda (Arab berat + SaaS ringan) | 3 suku kata, satu register, mengalir |
| Meaning | "Amanah" terlalu overused di Islamic finance Indonesia | Akar "sadaqa" fresh, bermakna ganda (charity + truth) |
| Cultural | Terlalu generik — bisa asuransi, koperasi, atau fintech apa saja | Langsung menunjuk ke donasi/sedekah |
| Functional | CamelCase trap, 10 karakter | 6 karakter, lowercase alami, domain tersedia |

---

## Positioning

### Positioning Statement
```
Untuk pengurus masjid & DKM di Indonesia
Yang tenggelam dalam spreadsheet donasi manual, konfirmasi WhatsApp harian,
dan jamaah yang terus tanya "sudah masuk berapa?"

Sadaqo adalah satu-satunya platform donasi
yang memang dibuat untuk masjid — bukan diadaptasi dari platform umum

Yang mengubah kampanye zakat/donasi menjadi halaman publik
yang bisa dibagikan ke WhatsApp dalam 5 menit,
tanpa developer, tanpa setup, gratis untuk mulai

Berbeda dari KitaBisa (crowdfunding umum, ambil fee, bukan untuk masjid),
BAZNAS/Lazismu apps (birokrasi, hanya lembaga resmi),
dan spreadsheet+WA manual (tidak ada transparansi publik)

Kami dibangun dari dalam — lahir dari frustrasi pengurus masjid itu sendiri,
dengan setiap donasi tercatat publik dan bisa diaudit siapa saja, kapan saja
```

### Only-We Test
> *"Kampanye masjid yang bisa dibagikan ke WhatsApp dalam 5 menit — dengan transparansi publik penuh bawaan, tanpa developer, gratis untuk mulai, dibuat khusus untuk DKM Indonesia."*

Tidak ada kompetitor yang bisa klaim ini secara bersamaan. ✓

---

## Tagline & Copy Utama

### Tagline
> **Sedekah yang Sahih.**

*Wordplay yang bekerja di dua level:*
- "Sadaqo" (brand) → "Sahih" (terverifikasi) — konsep yang terkait dalam Islamic scholarship
- Sedekah yang *bisa dibuktikan* — langsung menunjuk ke transparansi publik

### Tagline Alternatif (lebih functional)
> **Kampanye Masjid. Lima Menit.**

### One-Liner (30-detik pitch / hackathon)
> "Sadaqo membantu pengurus masjid membuat kampanye donasi yang siap dibagikan ke WhatsApp dalam 5 menit — semua transaksi tercatat publik dan bisa diaudit siapa saja, tanpa developer, gratis untuk mulai. 800.000 masjid Indonesia belum punya ini."

### Opening Hook (landing page hero)
> **"Berapa kali hari ini jamaah tanya 'sudah masuk berapa?'"**

Subheading: *Lima menit. Satu link. Jamaah bisa cek sendiri — tanpa perlu tanya lagi.*

---

## Target Audience

### Hero: Pengurus Masjid / Ketua DKM
- Usia 35–50 tahun
- Familiar WhatsApp, bukan developer
- Jabatan: Ketua DKM, Bendahara Masjid, Takmir
- **Before state:** Tenggelam di konfirmasi WA, rekap manual spreadsheet, jamaah terus tanya progress
- **After state:** Kampanye live dalam 5 menit, donatur cek sendiri, DKM punya waktu untuk ibadah lagi

### End-User: Jamaah (bukan hero, bukan target marketing)
Mereka menerima link dari DKM, bisa cek progress donasi tanpa login, tanpa tanya ke siapapun.

---

## Brand Voice

### 3 Kata Kunci

| Kata | Artinya dalam praktik |
|------|----------------------|
| **Khidmat** | Menghormati konteks masjid dan ibadah. Tidak cheerful berlebihan. Berbicara kepada seseorang yang tugasnya berat dan amanah. |
| **Tegas** | Tidak ada klaim yang tidak bisa dibuktikan. Tidak ada fluff. Setiap kalimat bisa di-fact-check — sesuai positioning transparansi. |
| **Lapang** | Perasaan *setelah* chaos spreadsheet berakhir. Tone-nya bukan urgensi atau FOMO — tapi relief. Nafas panjang. "Akhirnya ada yang beres." |

### Anti-Model
Sadaqo **tidak** bicara seperti:
- Fintech hype startup: *"Revolusikan cara Anda mengelola donasi!"*
- Lembaga resmi birokrasi: *"Dengan hormat, kami menyampaikan bahwa..."*
- Generic Islamic app: *"Platform islami terpercaya untuk ummat"*

### Vocabulary Guide

| ✅ Gunakan | ❌ Hindari |
|-----------|-----------|
| Pengurus masjid, DKM, takmir | "User", "customer" |
| Kampanye donasi | "Campaign" (tanpa terjemahan) |
| Jamaah | "Donor" (terlalu korporat) |
| Tercatat publik, bisa diaudit | "Dana langsung ke masjid" (tidak akurat) |
| 5 menit, tanpa developer | "Mudah digunakan" (terlalu generic) |
| Gratis untuk memulai | "Gratis selamanya" (tidak sustainable) |
| Transparansi penuh | "100% amanah" (terlalu klaim) |

---

## Transparansi — Panduan Copy

### Konteks Teknis
Platform menggunakan **Mayar** sebagai payment processor (Merchant of Record). Dana masuk ke akun Mayar terlebih dahulu sebelum diteruskan ke rekening masjid. Ini adalah mekanisme standar payment gateway.

### ❌ Klaim yang DILARANG
```
"Dana tidak pernah melalui kami"
"Dana langsung ke rekening masjid"
"Kami tidak pernah menyentuh uang donatur"
"100% amanah — dana langsung ke masjid"
```
*Alasan: Secara teknis tidak akurat. Mayar beroperasi sebagai MoR.*

### ✅ Framing yang Benar
```
"Setiap transaksi tercatat publik — donatur bisa audit kapan saja"
"Setiap donasi diproses oleh Mayar dan tercatat publik"
"Transparansi penuh: semua donasi bisa diverifikasi siapa saja"
"Donatur dapat memverifikasi setiap donasi kapan saja"
```
*Framing ini lebih kuat karena: (1) jujur, (2) audit trail adalah fitur nyata produk, bukan klaim.*

---

## Proof Points

1. **Simplicity is measurable:** "5 menit dari daftar ke link kampanye siap bagikan" — spesifik, falsifiable, jadi brand promise.
2. **Public auditability is structural:** Setiap halaman kampanye bisa diakses publik tanpa login. Ini bukan klaim marketing — ini cara produk dibangun.
3. **Mosque-specific by design:** Kalkulator zakat dengan logika nisab/haul, format share WhatsApp yang dioptimasi untuk kultur masjid Indonesia, Bahasa Indonesia throughout — bukan lokalisasi, tapi desain orisinal.

---

## Konteks Pasar

| Fakta | Sumber |
|-------|--------|
| 800.000+ masjid di Indonesia — terbanyak di dunia | — |
| Rp 327 triliun potensi zakat nasional/tahun | BAZNAS 2023 |
| Mayoritas DKM masih kelola donasi via spreadsheet + WA grup | — |

### Competitive Frame
| Kompetitor | Kelemahan vs Sadaqo |
|-----------|---------------------|
| KitaBisa | Crowdfunding umum, ambil %, bukan untuk masjid |
| BAZNAS/Lazismu apps | Hanya lembaga resmi, birokrasi berbulan-bulan |
| Spreadsheet + WA manual | Zero transparansi publik, DKM jadi bottleneck manual |

---

## The Movement Frame

Bukan "kami membuat platform donasi." Ini gerakan:

> *"Dari pencatatan manual yang mempermalukan masjid, ke transparansi publik yang memuliakan amanah jamaah."*

DKM bukan pengguna — mereka pemimpin gerakan ini. Sadaqo hanya memberi mereka alat yang layak untuk amanah yang sudah mereka emban.
