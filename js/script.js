const HARGA_WORKSHOP = {
  web: 150000,       // HARGA Front-End Web Development
  cyber: 200000,     // HARGA Cybersecurity Essentials
  network: 175000    // HARGA Computer Networking
};

const DISKON_TIPE_PESERTA = {
  mahasiswa: 0.20,   // Diskon 20% utk mahasiswa
  umum: 0.00         // g ad diskon untuk umum
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formPendaftaran');
  const summaryBox = document.getElementById('ringkasanPendaftaran');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      prosesPendaftaran();
    });
  }
});

function prosesPendaftaran() {
  //AMBIL VALUE DARI FORM 
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const nohp = document.getElementById('nohp').value.trim();
  const tanggal = document.getElementById('tanggal').value;
  const tipePeserta = document.getElementById('tipePeserta').value; // 'mahasiswa' atau 'umum'
  
  // Ambil semua checkbox workshop yang dipilih
  const workshopCheckboxes = document.querySelectorAll('input[name="workshop"]:checked');

  //VALIDASI FORM 
  // 1. Nama g boleh kosong
  if (nama === "") {
    alert("Nama lengkap tidak boleh kosong!");
    return;
  }

  // 2. Email harus keisi
  if (email === "") {
    alert("Alamat email tidak boleh kosong!");
    return;
  }

  // 3. Nomor HP valid (minimal 10 digit)
  if (nohp === "" || nohp.length < 10) {
    alert("Nomor HP harus valid dan minimal 10 digit!");
    return;
  }

  // 4. Tanggal dipilih
  if (tanggal === "") {
    alert("Silakan pilih tanggal kehadiran!");
    return;
  }

  // 5. Minimal 1 workshop dipilih
  if (workshopCheckboxes.length === 0) {
    alert("Pilih minimal satu workshop yang ingin diikuti!");
    return;
  }

  // Proses data
  let totalBiayaKasar = 0;
  let daftarWorkshopDipilih = [];

  // Perulangan dengan forEach biar bs memproses checkbox
  workshopCheckboxes.forEach((cb) => {
    const val = cb.value;
    daftarWorkshopDipilih.push(cb.getAttribute('data-nama') || val);

    // Hitung total biaya 
    if (HARGA_WORKSHOP[val]) {
      totalBiayaKasar += HARGA_WORKSHOP[val];
    }
  });

  // Branching utk diskon mahasiswa atau umum
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
    
    // untuk bs scroll otomatis ke ringkasan
    elementRingkasan.scrollIntoView({ behavior: 'smooth' });
  }
}