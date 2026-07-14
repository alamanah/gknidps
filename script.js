// ============================================================
// Masjid Al Amanah GKN I Denpasar — script.js
// Ini adalah demo front-end statis (cocok untuk GitHub Pages).
// Login & pendaftaran di sini BELUM tersambung ke server sungguhan —
// lihat catatan "TODO BACKEND" di bawah untuk menyambungkannya.
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('todayDate').textContent = '— ' + new Date().toLocaleDateString('id-ID', {
  day: 'numeric', month: 'long', year: 'numeric'
});

// ---------- Jadwal sholat otomatis (Aladhan API, metode Kemenag) ----------
// Sumber: https://aladhan.com/prayer-times-api
// method=20 -> Kemenag (Kementerian Agama Republik Indonesia)
const PRAYER_CITY = 'Denpasar';
const PRAYER_COUNTRY = 'Indonesia';
const PRAYER_METHOD = 20;

function formatDateForApi(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

async function loadPrayerTimes() {
  const dateStr = formatDateForApi(new Date());
  const url = `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(PRAYER_CITY)}&country=${encodeURIComponent(PRAYER_COUNTRY)}&method=${PRAYER_METHOD}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Gagal mengambil data (' + res.status + ')');
    const json = await res.json();
    const t = json.data.timings;

    document.querySelector('[data-prayer="Subuh"]').textContent = t.Fajr;
    document.querySelector('[data-prayer="Dzuhur"]').textContent = t.Dhuhr;
    document.querySelector('[data-prayer="Ashar"]').textContent = t.Asr;
    document.querySelector('[data-prayer="Maghrib"]').textContent = t.Maghrib;
    document.querySelector('[data-prayer="Isya"]').textContent = t.Isha;

    document.getElementById('prayerSource').textContent =
      `Jadwal otomatis dari Aladhan API (metode Kemenag) untuk ${PRAYER_CITY}, ${PRAYER_COUNTRY}.`;
  } catch (err) {
    console.error('Gagal memuat jadwal sholat:', err);
    document.getElementById('prayerSource').textContent =
      'Jadwal di atas belum berhasil diperbarui otomatis (koneksi ke Aladhan API gagal). Menampilkan waktu contoh — coba muat ulang halaman.';
  }
}

loadPrayerTimes();

// ---------- Menu mobile ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));

// ---------- Modal login / daftar ----------
const authModal = document.getElementById('authModal');
const modalClose = document.getElementById('modalClose');
const tabs = document.querySelectorAll('.modal-tab');
const panels = document.querySelectorAll('.modal-panel');

function openModal(tabName) {
  authModal.classList.add('open');
  switchTab(tabName);
}
function closeModal() {
  authModal.classList.remove('open');
}

function switchTab(name) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
}

document.getElementById('btnLogin').addEventListener('click', () => openModal('login'));
document.getElementById('btnWriteNew').addEventListener('click', () => openModal('login'));
modalClose.addEventListener('click', closeModal);
authModal.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });

tabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

// ---------- Form login ----------
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO BACKEND: kirim email + kata sandi ke server/Firebase Auth di sini.
  // Jika berhasil dan status akun "approved" -> arahkan ke dashboard penulis.
  // Jika status masih "pending" -> tampilkan pesan "akun masih menunggu validasi admin".
  alert('Contoh saja: sambungkan form ini ke sistem login (mis. Firebase Auth / API sendiri).');
});

// ---------- Form daftar penulis ----------
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = e.target.querySelector('input[type="text"]').value || 'Anda';
  // TODO BACKEND: simpan data pendaftar ke database dengan status "pending",
  // lalu kirim notifikasi ke admin DKM (email/WhatsApp) untuk ditinjau.
  document.getElementById('pendingName').textContent = nama;
  switchTab('pending');
});
