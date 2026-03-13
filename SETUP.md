# Setup Sadaqo

## Prasyarat

- Node.js 18+ / pnpm / npm
- Akun [Supabase](https://supabase.com) (gratis)
- Akun [Mayar](https://mayar.id) (untuk payment gateway)

---

## 1. Clone & Install

```bash
git clone <repo-url>
cd amanahflow
pnpm install   # atau npm install
```

---

## 2. Setup Supabase

### 2a. Buat Project

1. Buka [supabase.com](https://supabase.com) → **New Project**
2. Isi nama project, password DB, pilih region terdekat (Singapore)
3. Tunggu hingga project siap (~1 menit)

### 2b. Jalankan Migration

Di Supabase Dashboard → **SQL Editor**, paste dan jalankan isi file:

```
supabase/migrations/001_initial_schema.sql
```

(Opsional) Untuk data demo:

```
supabase/seed.sql
```

### 2c. Konfigurasi Auth

Di **Authentication → URL Configuration**:

- **Site URL**: `https://domain-kamu.vercel.app` (atau `http://localhost:3000` untuk dev)
- **Redirect URLs**: tambahkan:
  - `https://domain-kamu.vercel.app/callback`
  - `http://localhost:3000/callback`

### 2d. Setup Email Template (agar email tidak jelek)

Di **Authentication → Email Templates**, ganti template untuk:

**"Magic Link"** — salin isi dari: `supabase/email-templates/magic-link.html`
- Subject: `Link Masuk ke Sadaqo`

**"Confirm signup"** — salin isi dari: `supabase/email-templates/confirm-signup.html`
- Subject: `Selamat Datang di Sadaqo — Verifikasi Email Anda`

> **Mengapa localhost:3000 di email?**
> Karena "Site URL" di Supabase masih default ke localhost. Ubah ke URL production di URL Configuration.

### 2e. (Opsional) SMTP Custom

Untuk email lebih reliable dan tanpa logo Supabase, gunakan SMTP sendiri:
**Authentication → SMTP Settings** → aktifkan Custom SMTP

Rekomendasi: [Resend.com](https://resend.com) (gratis 3k email/bulan)

---

## 3. Environment Variables

Copy file dan isi nilainya:

```bash
cp .env.example .env.local
```

Isi `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

MAYAR_API_BASE_URL=https://api.mayar.club/hl/v1
MAYAR_API_KEY=your-mayar-api-key

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Nilai Supabase ada di: **Project Settings → API**

---

## 4. Jalankan Development

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Alur Pengguna

### Sebagai Admin (Pengurus Masjid)

1. Buka `/register` → isi nama, nama masjid, email
2. Cek email → klik link verifikasi
3. Otomatis masuk ke `/dashboard`
4. Buat kampanye di **Kampanye → Buat Kampanye Baru**
5. Share link kampanye ke donatur

### Sebagai Donatur (User Publik)

1. Buka link kampanye yang dibagikan (tidak perlu login)
2. Klik **Donasi Sekarang** → pilih nominal → diarahkan ke Mayar
3. Selesaikan pembayaran di Mayar
4. Lihat transparansi di `/transparansi/[slug-kampanye]`

---

## Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables di Vercel Dashboard → Project → Settings → Environment Variables.

Setelah deploy, update **Site URL** dan **Redirect URLs** di Supabase ke URL Vercel.
