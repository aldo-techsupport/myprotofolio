# Admin Guide

Panduan lengkap untuk mengelola portfolio melalui Admin Dashboard.

## Login

1. Akses: `https://aboutme.digitaltekno.cloud/admin`
2. Kredensial default:
   - Username: `admin`
   - Password: `admin123`

## Fitur Admin Dashboard

### 1. Data Personal
Edit informasi pribadi:
- Nama
- Title/Jabatan
- Tagline
- About/Deskripsi
- Phone
- Email
- Lokasi
- LinkedIn

### 2. Pengalaman Kerja (CRUD Lengkap)

**Tambah Pengalaman Baru:**
1. Klik tab "💼 Pengalaman"
2. Klik tombol "➕ Tambah Pengalaman"
3. Isi form:
   - Nama Perusahaan
   - Posisi/Role
   - Periode (contoh: Mei 2025 – Sekarang)
   - Lokasi
   - Tipe Pekerjaan (Full Time, Part Time, Internship, Contract, Freelance)
   - Warna tema
   - Deskripsi singkat
   - Tugas & Tanggung Jawab (pisahkan dengan Enter)
   - Tags/Skills (pisahkan dengan koma)
4. Klik "✅ Simpan Pengalaman"

**Edit Pengalaman:**
1. Klik tombol "▼ Edit Detail" pada pengalaman yang ingin diedit
2. Ubah data yang diperlukan
3. Perubahan tersimpan otomatis saat mengetik

**Hapus Pengalaman:**
1. Klik tombol "🗑️" pada pengalaman yang ingin dihapus
2. Konfirmasi penghapusan

### 3. Proyek (CRUD Lengkap)

**Tambah Proyek Baru:**
1. Klik tab "🚀 Proyek"
2. Klik tombol "➕ Tambah Proyek"
3. Isi form:
   - Judul Proyek
   - Tipe (contoh: Web Developer – Personal Project)
   - Tahun
   - Warna tema (Cyan, Purple, Red, Yellow, Blue)
   - Emoji icon
   - Deskripsi
   - Highlights (pisahkan dengan Enter)
   - Tech Stack (pisahkan dengan koma)
4. Klik "✅ Simpan Proyek"

**Edit Proyek:**
1. Klik tombol "✏️ Edit" pada proyek yang ingin diedit
2. Ubah data yang diperlukan
3. Klik "✅ Selesai Edit"

**Hapus Proyek:**
1. Klik tombol "🗑️ Hapus" pada proyek yang ingin dihapus
2. Konfirmasi penghapusan

### 4. Skills (CRUD Lengkap)

**Tambah Kategori Skill Baru:**
1. Klik tab "⚡ Skills"
2. Klik tombol "➕ Tambah Kategori"
3. Isi form:
   - Nama Kategori (contoh: Web Development)
   - Icon (pilih dari dropdown)
   - Warna tema
4. Klik "✅ Simpan Kategori"

**Kelola Skills dalam Kategori:**
1. Klik tombol "▼ Kelola Skills" pada kategori
2. Untuk menambah skill:
   - Isi nama skill
   - Atur level dengan slider (0-100%)
   - Klik "✅ Tambah Skill"
3. Untuk edit skill:
   - Edit nama langsung di input field
   - Geser slider untuk ubah level
4. Untuk hapus skill:
   - Klik tombol "🗑️" pada skill

**Hapus Kategori:**
1. Klik tombol "🗑️" pada kategori yang ingin dihapus
2. Konfirmasi penghapusan

### 5. Pendidikan
Edit informasi pendidikan:
- Gelar
- Institusi
- Periode
- IPK

## Menyimpan Perubahan

1. Setelah melakukan perubahan, klik tombol "💾 Simpan Perubahan" di bagian atas
2. Tunggu notifikasi "✅ Data berhasil disimpan!"
3. Refresh halaman utama untuk melihat perubahan

## Tips

- Semua data tersimpan di database MySQL
- Perubahan akan langsung terlihat setelah refresh halaman utama
- Gunakan warna dan emoji yang konsisten untuk tampilan yang menarik
- Level skill sebaiknya realistis (50-90% untuk skill yang dikuasai)

## Template Warna

- **Cyan (#00FFB2)**: Cocok untuk teknologi modern, web development
- **Purple (#7B61FF)**: Cocok untuk networking, sistem
- **Red (#FF6B6B)**: Cocok untuk cloud, infrastructure
- **Yellow (#FFB800)**: Cocok untuk hardware, IoT
- **Blue (#00B8FF)**: Cocok untuk database, backend

## Emoji Populer

**Proyek:**
- 🚀 Deployment/Launch
- 🔌 Network/Hardware
- 📡 IoT/Sensor
- ☁️ Cloud
- 💻 Software
- 🌐 Web
- ⚡ Performance
- 🎯 Target/Goal

**Skills:**
- 💻 Programming
- 🔗 Networking
- ☁️ Cloud
- ⚡ Performance
- 🎨 Design
- 📱 Mobile
- 🛠️ Tools
- 🔧 Configuration
