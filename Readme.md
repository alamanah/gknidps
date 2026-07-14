# Website Masjid Al Amanah GKN I Denpasar

Website statis (HTML/CSS/JS murni, tanpa framework) — siap untuk GitHub Pages.

## Isi folder
- `index.html` — struktur halaman
- `style.css` — semua styling (warna hijau-putih, responsif)
- `script.js` — interaktivitas: menu mobile, modal login/daftar penulis

## Cara push ke GitHub

```bash
cd nama-folder-ini
git init
git add .
git commit -m "Initial commit: website Masjid Al Amanah GKN I Denpasar"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

## Cara aktifkan GitHub Pages
1. Buka repo di GitHub → **Settings** → **Pages**
2. Di **Build and deployment** → **Source**, pilih **Deploy from a branch**
3. Pilih branch `main` dan folder `/ (root)`, lalu **Save**
4. Website akan aktif di `https://USERNAME.github.io/NAMA-REPO/` dalam 1-2 menit

## Catatan penting: login & pendaftaran belum tersambung ke server

Karena GitHub Pages hanya menyajikan file statis, form **Login** dan **Daftar penulis baru** di `script.js` saat ini baru contoh tampilan (belum benar-benar menyimpan data atau memvalidasi akun). Untuk membuatnya benar-benar berfungsi (termasuk alur "menunggu validasi admin DKM"), butuh backend, misalnya:

- **Firebase** (Auth + Firestore) — paling mudah untuk situs statis, gratis untuk skala kecil
- **Supabase** — alternatif open-source Firebase
- Backend sendiri (Node.js/PHP) + database, jika ingin kontrol penuh

Alur yang disarankan:
1. User isi form daftar → status akun disimpan sebagai `pending`
2. Admin DKM login ke panel admin → melihat daftar `pending` → **Setujui**/**Tolak**
3. Jika disetujui, status berubah jadi `approved` dan user bisa login serta mulai menulis artikel

Beri tahu saya kalau mau saya lanjutkan sampai ke tahap ini (butuh pilih salah satu opsi backend di atas).

## Kustomisasi cepat
- Ganti jadwal sholat manual tiap hari di `index.html` (bagian `.prayer-grid`), atau sambungkan ke API seperti Aladhan/Kemenag.
- Ganti gambar galeri: ganti `<div class="gallery-item">` dengan `<img src="foto.jpg">`.
- Warna utama ada di `style.css` bagian `:root` (`--green-700`, dst.) — ganti di satu tempat, seluruh situs ikut berubah.
