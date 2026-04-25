# Aldo Aditya Putra — Interactive CV Website

Website CV interaktif dengan full animasi dibangun menggunakan **Next.js 14**, **Framer Motion**, dan **Tailwind CSS**.

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.2.5 | React Framework (App Router) |
| React | 18 | UI Library |
| TypeScript | 5 | Type Safety |
| Tailwind CSS | 3.4 | Utility-first CSS |
| Framer Motion | 11 | Animations & Transitions |
| Lucide React | 0.383 | Icons |

## ✨ Features

- **Particle Canvas** — Animated network graph di hero section
- **Typewriter Effect** — Role switcher animasi di hero
- **Scroll Animations** — Setiap section muncul dengan `whileInView` dari Framer Motion
- **Floating Card** — Profile card dengan animasi float & badge melayang
- **Tab Experience** — Switch antar pengalaman kerja dengan layout animation
- **Animated Skill Bars** — Progress bar yang mengisi saat di-scroll ke section skills
- **Project Cards** — Hover effects dengan gradient & glow
- **Sticky Navbar** — Blur backdrop + active section indicator
- **Responsive** — Mobile-first, breakpoint md & lg
- **Custom Scrollbar** — Styled scrollbar accent warna hijau
- **Dark Theme** — Full dark mode dengan color palette konsisten

## 📁 Struktur Proyek

```
aldo-cv/
├── app/
│   ├── globals.css        # Global styles, animations, utility classes
│   ├── layout.tsx         # Root layout + font imports
│   └── page.tsx           # Main page (assembles all sections)
├── components/
│   ├── Navbar.tsx         # Sticky nav + mobile menu
│   ├── HeroSection.tsx    # Landing hero + particle canvas
│   ├── AboutSection.tsx   # About me + highlight grid
│   ├── ExperienceSection.tsx  # Work experience tabs
│   ├── ProjectsSection.tsx    # Project cards grid
│   ├── SkillsSection.tsx      # Animated skill bars + tag cloud
│   ├── EducationSection.tsx   # Education + certification
│   ├── ContactSection.tsx     # Contact cards + CTA
│   └── Footer.tsx         # Footer
├── lib/
│   └── data.ts            # Semua data CV (mudah diedit)
├── public/                # Static assets
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🛠️ Cara Menjalankan

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# 1. Masuk ke folder proyek
cd aldo-cv

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka di browser
# http://localhost:3000
```

### Build untuk Production

```bash
npm run build
npm start
```

## 🎨 Color Palette

| Variable | Hex | Penggunaan |
|---|---|---|
| `--bg` | `#0A0A0F` | Background utama |
| `--surface` | `#111118` | Card background |
| `--accent` | `#00FFB2` | Highlight utama (hijau neon) |
| `--accent2` | `#7B61FF` | Secondary accent (ungu) |
| `--accent3` | `#FF6B6B` | Tertiary accent (merah) |
| `--text` | `#E8E8F0` | Teks utama |
| `--dim` | `#8888AA` | Teks muted |

## ✏️ Cara Update Data CV

Semua data CV terpusat di satu file: **`lib/data.ts`**

Edit file tersebut untuk mengubah:
- Informasi kontak
- Deskripsi pengalaman kerja
- Data proyek & portfolio
- Skill dan level skill
- Pendidikan & sertifikasi

## 🌐 Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, done!
```

Atau drag & drop folder ke [vercel.com](https://vercel.com) dashboard.

---

Made with ❤️ — Aldo Aditya Putra © 2025


---

## 🔐 Admin Panel (NEW!)

Website ini sekarang dilengkapi dengan **Admin Panel** untuk mengedit data CV secara manual tanpa perlu coding!

### 🚪 Login Admin
- **URL:** `http://your-domain.com/login`
- **Username:** `admin`
- **Password:** `admin123` ⚠️ **GANTI SEGERA!**

### 📝 Fitur Admin Panel
- ✅ Edit data personal (nama, title, about, kontak)
- ✅ Edit pengalaman kerja (perusahaan, posisi, lokasi)
- ✅ Edit data pendidikan
- ✅ Simpan perubahan langsung ke file
- ✅ Protected dengan autentikasi NextAuth

### 🔑 Cara Mengganti Password

**PENTING:** Ganti password default sebelum deploy ke production!

```bash
# 1. Edit file scripts/generate-password.js
# Ganti nilai password dengan password baru Anda

# 2. Generate hash baru
node scripts/generate-password.js

# 3. Copy hash yang dihasilkan ke .env.local
# ADMIN_PASSWORD_HASH=hash_yang_baru

# 4. Restart aplikasi
pm2 restart myprotofolio
```

### 📖 Dokumentasi Lengkap
Lihat **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** untuk panduan lengkap penggunaan admin panel.

### 🔒 Keamanan
- ✅ Password di-hash dengan bcrypt
- ✅ Session management dengan NextAuth
- ✅ Protected routes
- ✅ Environment variables untuk credentials
- ⚠️ **Jangan commit file `.env.local` ke Git!**

### 🛠️ Tech Stack Admin
- NextAuth.js - Authentication
- bcryptjs - Password hashing
- Server Actions - Data persistence

---

**Updated:** April 2026 — Admin Panel Added

---

## 📊 Analytics Feature (NEW!)

Website sekarang dilengkapi dengan **Visitor Analytics** untuk melacak pengunjung CV Anda!

### 🎯 Fitur Analytics
- ✅ Track IP address & lokasi pengunjung (negara, kota)
- ✅ Deteksi ISP & timezone
- ✅ Statistik per negara & kota
- ✅ **Admin visits tracking** - Tau kapan HRD buka CV!
- ✅ Real-time notifications
- ✅ Quick stats di dashboard

### 🚀 Setup Analytics

```bash
# Setup database tables
npm run setup:analytics
```

### 📈 Akses Analytics Dashboard
1. Login admin: `http://your-domain.com/admin`
2. Klik tombol **"📊 Analytics"** di header
3. Atau langsung: `http://your-domain.com/admin/analytics`

### 🎯 Cara Tau HRD Sudah Buka CV
Di Analytics Dashboard, perhatikan:
- **Admin Visits** counter - jumlah kunjungan dari admin mode
- Badge **Admin** (kuning) di Recent Visitors table
- Cek lokasi & ISP - apakah sesuai dengan perusahaan target?

### 📊 Data yang Dilacak
- IP Address
- Lokasi (Negara, Kota, Region)
- ISP (Internet Service Provider)
- Timezone & Koordinat
- Browser & Device info
- Halaman yang dikunjungi
- Referrer (dari mana datang)
- Waktu kunjungan
- Status Admin/Public

### 📖 Dokumentasi
Lihat **[README_ANALYTICS.md](./README_ANALYTICS.md)** untuk detail lengkap.

---

**Updated:** April 2026 — Analytics Feature Added
