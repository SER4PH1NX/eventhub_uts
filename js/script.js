/* WORKSHOP HARGA */

const HARGA_WORKSHOP = {
    web: 150000,
    uiux: 175000,
    cyber: 200000
};


/* PESERTA DISCOUNT */

const DISKON_TIPE_PESERTA = {
    mahasiswa: 0.20,
    umum: 0.00
};


/* FORM EVENT */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formPendaftaran");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            prosesPendaftaran();

        });

    }

});


/* MAIN FUNCTION */

function prosesPendaftaran() {

    /* FORM VALUE */

    const nama = document
        .getElementById("nama")
        .value
        .trim();

    const email = document
        .getElementById("email")
        .value
        .trim();

    const nohp = document
        .getElementById("nohp")
        .value
        .trim();

    const tanggal = document
        .getElementById("tanggal")
        .value;

    const sesi = document
        .getElementById("sesi")
        .value;

    const institusi = document
        .getElementById("institusi")
        .value
        .trim();


    const tipePesertaElement = document.querySelector(
        'input[name="tipePeserta"]:checked'
    );

    const tipePeserta = tipePesertaElement
        ? tipePesertaElement.value
        : "";


    /* CHECKBOX */

    const workshopCheckboxes = document.querySelectorAll(
        'input[name="workshop"]:checked'
    );


    /* VALIDASI */

    // Nama
    if (nama === "") {

        alert("Nama lengkap tidak boleh kosong!");

        document.getElementById("nama").focus();

        return;
    }


    // Email
    if (email === "") {

        alert("Alamat email tidak boleh kosong!");

        document.getElementById("email").focus();

        return;
    }


    // Validasi format email
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!polaEmail.test(email)) {

        alert("Format email tidak valid!");

        document.getElementById("email").focus();

        return;
    }


    // No. HP
    const polaNomorHP = /^[0-9]{10,13}$/;

    if (!polaNomorHP.test(nohp)) {

        alert(
            "Nomor HP harus berupa 10-13 digit angka!"
        );

        document.getElementById("nohp").focus();

        return;
    }


    // Tanggal
    if (tanggal === "") {

        alert("Silakan pilih tanggal kehadiran!");

        document.getElementById("tanggal").focus();

        return;
    }


    // Sesi
    if (sesi === "") {

        alert("Silakan pilih sesi workshop!");

        document.getElementById("sesi").focus();

        return;
    }


    // Tipe peserta
    if (tipePeserta === "") {

        alert("Silakan pilih tipe peserta!");

        return;
    }


    // Institusi
    if (institusi === "") {

        alert("Isi asal institusi");

        document.getElementById("institusi").focus();

        return;
    }


    // Minimal satu workshop
    if (workshopCheckboxes.length === 0) {

        alert(
            "Pilih minimal satu workshop yang ingin diikuti!"
        );

        return;
    }


    /* PROCESS DATA */

    let totalBiayaKasar = 0;

    let daftarWorkshopDipilih = [];


    /* ITERATION */

    workshopCheckboxes.forEach(function (checkbox) {

        const kodeWorkshop = checkbox.value;

        const namaWorkshop =
            checkbox.getAttribute("data-nama");

        daftarWorkshopDipilih.push(namaWorkshop);


        /* KALKULASI HARGA */

        if (HARGA_WORKSHOP[kodeWorkshop]) {

            totalBiayaKasar +=
                HARGA_WORKSHOP[kodeWorkshop];

        }

    });


    /* BRANCHING */

    let persenDiskon = 0;

    if (tipePeserta === "mahasiswa") {

        persenDiskon =
            DISKON_TIPE_PESERTA.mahasiswa;

    } else {

        persenDiskon =
            DISKON_TIPE_PESERTA.umum;

    }


    /* HARGA AKHIR */

    const jumlahDiskon =
        totalBiayaKasar * persenDiskon;

    const totalBiayaAkhir =
        totalBiayaKasar - jumlahDiskon;


    /* DISPLAY TIPE PESERTA */

    let namaTipePeserta = "";

    if (tipePeserta === "mahasiswa") {

        namaTipePeserta =
            "Mahasiswa (Diskon 20%)";

    } else {

        namaTipePeserta =
            "Umum (Harga Normal)";

    }


    /* DISPLAY SESI */

    let namaSesi = "";

    if (sesi === "pagi") {

        namaSesi =
            "Sesi Pagi (09.00 - 12.00)";

    } else {

        namaSesi =
            "Sesi Siang (13.00 - 16.00)";

    }


    /* DISPLAY LIST WORKSHOP */

    let daftarWorkshopHTML = "";

    daftarWorkshopDipilih.forEach(function (workshop) {

        daftarWorkshopHTML +=
            `<li>${workshop}</li>`;

    });


    /* DISPLAY SUMMARY */

    const elementRingkasan =
        document.getElementById(
            "ringkasanPendaftaran"
        );


    if (elementRingkasan) {

        elementRingkasan.innerHTML = `

            <div class="card border-success mt-4 shadow-sm">

                <div class="card-header bg-success text-white">

                    <h4 class="m-0">
                        Ringkasan Pendaftaran
                    </h4>

                </div>


                <div class="card-body">

                    <p>
                        <strong>Nama Peserta:</strong>
                        ${nama}
                    </p>


                    <p>
                        <strong>Email:</strong>
                        ${email}
                    </p>


                    <p>
                        <strong>Nomor HP:</strong>
                        ${nohp}
                    </p>


                    <p>
                        <strong>Institusi:</strong>
                        ${institusi}
                    </p>


                    <p>
                        <strong>Tanggal Kehadiran:</strong>
                        ${tanggal}
                    </p>


                    <p>
                        <strong>Sesi:</strong>
                        ${namaSesi}
                    </p>


                    <p>
                        <strong>Tipe Peserta:</strong>
                        ${namaTipePeserta}
                    </p>


                    <p>
                        <strong>Workshop Dipilih:</strong>
                    </p>


                    <ul>
                        ${daftarWorkshopHTML}
                    </ul>


                    <hr>


                    <p>
                        <strong>Total Sebelum Diskon:</strong>
                        Rp ${totalBiayaKasar.toLocaleString("id-ID")}
                    </p>


                    <p>
                        <strong>Diskon:</strong>
                        Rp ${jumlahDiskon.toLocaleString("id-ID")}
                    </p>


                    <h5 class="text-success">

                        <strong>
                            Total Biaya:
                        </strong>

                        Rp ${totalBiayaAkhir.toLocaleString("id-ID")}

                    </h5>

                </div>

            </div>

        `;
        
        elementRingkasan.scrollIntoView({
            behavior: "smooth"
        });

    }

}