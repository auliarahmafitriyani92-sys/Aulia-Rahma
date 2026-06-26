$(document).ready(function() {
    var isFotoValid = false; 
    var globalPhotoData = ""; 

    // TRIGGER TOMBOL UPLOAD
    $("#btn-pilih-foto").click(function(e) {
        e.preventDefault();
        $("#foto").click();
    });

    $("#foto").change(function() {
        var file = this.files[0];
        $("#error-foto").text("").hide();
        
        if (file) {
            var match = ["image/jpeg", "image/jpg", "image/png"];
            if (!match.includes(file.type)) {
                $("#error-foto").text("Format tidak didukung! Gunakan JPG, JPEG, atau PNG.").show();
                $("#preview").hide();
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                $("#error-foto").text("Ukuran file terlalu besar! Maksimal 2 MB.").show();
                $("#preview").hide();
                return;
            }

            isFotoValid = true;
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#preview").attr("src", e.target.result).show();
                $("#preview").css("border", "none");
                $("#placeholder-text").hide();
                globalPhotoData = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // VALIDASI 
    $("#formMahasiswa").validate({
        rules: {
            nim: { required: true, digits: true, minlength: 8 },
            nama: { required: true, minlength: 5 },
            email: { required: true, email: true },
            hp: { required: true, digits: true, minlength: 10 },
            gender: { required: true },
            prodi: { required: true },
            alamat: { required: true, minlength: 10 },
            foto: { required: true }
        },
        messages: {
            nim: { 
                required: "NIM wajib diisi.", 
                digits: "NIM harus berupa angka.", 
                minlength: "NIM minimal terdiri dari 8 angka." 
            },
            nama: { 
                required: "Nama lengkap wajib diisi.", 
                minlength: "Nama minimal terdiri dari 5 karakter." 
            },
            email: { 
                required: "Email wajib diisi.", 
                email: "Mohon masukkan format email yang valid." 
            },
            hp: { 
                required: "Nomor HP wajib diisi.", 
                digits: "Nomor HP harus berupa angka.", 
                minlength: "Nomor HP minimal 10 angka." 
            },
            gender: { required: "Mohon pilih jenis kelamin Anda." },
            prodi: { required: "Mohon pilih program studi Anda." },
            alamat: { 
                required: "Alamat wajib diisi.", 
                minlength: "Alamat minimal terdiri dari 10 karakter." 
            },
            foto: { required: "Pasfoto wajib diunggah." }
        },
        errorPlacement: function(error, element) {
            error.appendTo("#error-" + element.attr("id"));
        },
        submitHandler: function(form) {
            // Mengisi data ke Ringkasan
            $("#tampil-nim").text($("#nim").val());
            $("#tampil-nama").text($("#nama").val());
            $("#tampil-email").text($("#email").val());
            $("#tampil-hp").text($("#hp").val());
            $("#tampil-gender").text($("input[name='gender']:checked").val());
            $("#tampil-prodi").text($("#prodi").val());
            $("#tampil-alamat").text($("#alamat").val());
            $("#card-img").attr("src", globalPhotoData);

            // Animasi Transisi
            $("#form-container").slideUp(500, function() {
                $("#box-summary").fadeIn(500);
            });
            $("#status").text("Status: Pendaftaran berhasil disimpan.");
            return false;
        }
    });

    // TOMBOL EDIT
    $("#btn-edit").on("click", function() {
        $("#box-summary").fadeOut(400, function() {
            $("#form-container").slideDown(500);
        });
        $("#status").text("Status: Sedang mengedit data...");
    });

    // TOMBOL RESET
    $("#btn-reset").on("click", function() {
        $(".error-container").text("");
        $("#preview").hide();
        $("#placeholder-text").show();
        $("#status").text("Status: Form telah di-reset.");
        $("#formMahasiswa").validate().resetForm();
    });
});

