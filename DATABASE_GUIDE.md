# Database Guide

## Konfigurasi Database

Aplikasi portfolio sekarang menggunakan MySQL untuk menyimpan semua data CV.

### Kredensial Database

File: `.env.local`

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=myprotofolio
DB_USER=myprotofolio
DB_PASSWORD=12341234
```

### Setup Database

Untuk setup database pertama kali atau reset data:

```bash
node scripts/setup-database.js
```

Script ini akan:
- Membuat tabel `cv_data`
- Mengisi data awal dari template

### Struktur Database

**Tabel: cv_data**

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto increment |
| data_key | VARCHAR(50) | Unique key untuk jenis data (personal, experience, projects, dll) |
| data_value | JSON | Data dalam format JSON |
| updated_at | TIMESTAMP | Waktu terakhir diupdate |

### Data Keys

- `personal` - Data pribadi (nama, title, tagline, about, contact)
- `stats` - Statistik (IPK, proyek, sertifikasi, pengalaman)
- `experience` - Pengalaman kerja
- `projects` - Proyek yang dikerjakan
- `skills` - Keahlian
- `education` - Pendidikan
- `certifications` - Sertifikasi
- `organization` - Organisasi

### Edit Data

1. Login ke admin panel: `https://aboutme.digitaltekno.cloud/admin`
2. Edit data di form yang tersedia
3. Klik "💾 Simpan Perubahan"
4. Data akan tersimpan ke database MySQL
5. Refresh halaman utama untuk melihat perubahan

### API Endpoints

- `GET /api/cv-data` - Mengambil semua data CV dari database
- `POST /api/save-data` - Menyimpan data CV ke database (requires authentication)

### Backup Database

```bash
mysqldump -u myprotofolio -p myprotofolio > backup.sql
```

### Restore Database

```bash
mysql -u myprotofolio -p myprotofolio < backup.sql
```
