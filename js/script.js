document.getElementById('formPendaftaran').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah reload halaman

    // Ambil nilai dari input form
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const nohp = document.getElementById('nohp').value;
    const instansi = document.getElementById('instansi').value || '-';
    const tipePeserta = document.querySelector('input[name="tipePeserta"]:checked').value;
    const tanggal = document.getElementById('tanggal').value;
    const sesi = document.getElementById('sesi').value;

    // Ambil pilihan workshop dari checkbox
    const checkboxes = document.querySelectorAll('.check-workshop:checked');
    let workshopDipilih = [];
    checkboxes.forEach((cb) => {
        workshopDipilih.push(cb.value);
    });

    // Validasi minimal 1 workshop dipilih
    if (workshopDipilih.length === 0) {
        alert('Harap pilih minimal satu workshop!');
        return;
    }

    // Tampilkan hasil ke elemen ringkasan
    document.getElementById('resNama').innerText = nama;
    document.getElementById('resEmail').innerText = email;
    document.getElementById('resNoHp').innerText = nohp;
    document.getElementById('resInstansi').innerText = instansi;
    document.getElementById('resTipe').innerText = tipePeserta;
    document.getElementById('resTanggal').innerText = tanggal;
    document.getElementById('resWorkshop').innerText = workshopDipilih.join(', ');
    document.getElementById('resSesi').innerText = sesi;

    // Tampilkan blok ringkasan pendaftaran
    const resBox = document.getElementById('ringkasanPendaftaran');
    resBox.classList.remove('d-none');

    // Scroll mulus menuju ringkasan pendaftaran
    resBox.scrollIntoView({ behavior: 'smooth' });
});