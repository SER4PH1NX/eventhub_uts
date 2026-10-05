// ========================================================
// EVENTHUB - JS DASAR & INTERAKTIVITAS DOM (UTS WEB)
// ========================================================

// 1. STRUKTUR BIAYA EKSPLISIT (Dapat ditemukan & dipahami dosen)
const HARGA_WORKSHOP = {
  web: 150000,       // Front-End Web Development
  cyber: 200000,     // Cybersecurity Essentials
  network: 175000    // Computer Networking
};

const DISKON_TIPE_PESERTA = {
  mahasiswa: 0.20,   // Diskon 20% untuk Mahasiswa
  umum: 0.00         // Tidak ada diskon untuk Umum
};

// 2. EVENT LISTENER SAAT FORM DISUBMIT
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formPendaftaran');
  const summaryBox = document.getElementById('ringkasanPendaftaran');

  if (form) {
    form.addEventListener('submit', function (event) {
      // Prevent reload halaman
      event.preventDefault();

      // Jalankan Fungsi Proses Data Form
      prosesPendaftaran();
    });
  }
});

// 3. FUNGSI UTAMA PROSES FORM (Variabel, Operator, Percabangan, Iterasi, DOM)
function prosesPendaftaran() {
  // --- AMBIL VALUE DARI FORM ---
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const nohp = document.getElementById('nohp').value.trim();
  const tanggal = document.getElementById('tanggal').value;
  const tipePeserta = document.getElementById('tipePeserta').value; // 'mahasiswa' atau 'umum'
  
  // Ambil semua checkbox workshop yang dipilih
  const workshopCheckboxes = document.querySelectorAll('input[name="workshop"]:checked');

  // --- VALIDASI FORM MINIMAL ---
  // 1. Nama tidak kosong
  if (nama === "") {
    alert("Nama lengkap tidak boleh kosong!");
    return;
  }

  // 2. Email terisi
  if (email === "") {
    alert("Alamat email tidak boleh kosong!");
    return;
  }

  // 3. Nomor HP valid (minimal 10 angka)
  if (nohp === "" || nohp.length < 10) {
    alert("Nomor HP harus valid dan minimal 10 digit!");
    return;
  }

  // 4. Tanggal dipilih
  if (tanggal === "") {
    alert("Silakan pilih tanggal kehadiran!");
    return;
  }

  // 5. Minimal satu workshop dipilih
  if (workshopCheckboxes.length === 0) {
    alert("Pilih minimal satu workshop yang ingin diikuti!");
    return;
  }

  // --- PEMROSESAN DATA (PERULANGAN & PERCABANGAN) ---
  let totalBiayaKasar = 0;
  let daftarWorkshopDipilih = [];

  // Perulangan (Iteration) menggunakan forEach untuk memproses checkbox
  workshopCheckboxes.forEach((cb) => {
    const val = cb.value;
    daftarWorkshopDipilih.push(cb.getAttribute('data-nama') || val);

    // Hitung total biaya berdasarkan struktur harga
    if (HARGA_WORKSHOP[val]) {
      totalBiayaKasar += HARGA_WORKSHOP[val];
    }
  });

  // Percabangan (Branching) untuk Diskon Tipe Peserta
  let persenDiskon = 0;
  if (tipePeserta === "mahasiswa") {
    persenDiskon = DISKON_TIPE_PESERTA.mahasiswa;
  } else {
    persenDiskon = DISKON_TIPE_PESERTA.umum;
  }

  // Hitung Biaya Akhir
  const jumlahDiskon = totalBiayaKasar * persenDiskon;
  const totalBiayaAkhir = totalBiayaKasar - jumlahDiskon;

  const elementRingkasan = document.getElementById('ringkasanPendaftaran');
  if (elementRingkasan) {
    elementRingkasan.innerHTML = `
      <div class="card border-success mt-4">
        <div class="card-header bg-success text-white">
          <h4 class="m-0">Ringkasan Pendaftaran (Berhasil)</h4>
        </div>
        <div class="card-body">
          <p><strong>Nama Peserta:</strong> ${nama}</p>
          <p><strong>Email / HP:</strong> ${email} / ${nohp}</p>
          <p><strong>Tanggal Kehadiran:</strong> ${tanggal}</p>
          <p><strong>Tipe Peserta:</strong> ${tipePeserta.toUpperCase()} ${persenDiskon > 0 ? '(Diskon 20%)' : ''}</p>
          <p><strong>Workshop Dipilih:</strong></p>
          <ul>
            ${daftarWorkshopDipilih.map(w => `<li>${w}</li>`).join('')}
          </ul>
          <hr>
          <h5><strong>Total Biaya:</strong> Rp ${totalBiayaAkhir.toLocaleString('id-ID')}</h5>
        </div>
      </div>
    `;
    
    // Scroll otomatis ke ringkasan
    elementRingkasan.scrollIntoView({ behavior: 'smooth' });
  }
}