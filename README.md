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
