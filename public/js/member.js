"use strict";




// Perubahan Terakhir terjadi pada 12/11/2020
// BUG : Tidak dapat menonaktifkan order pada coloum pertama





// Event Untuk Tombol Action Edit
$(document).on("click", "button.edit", function (e) {
  $("#editModal").modal("toggle");
  let test = $(this).parent().prevAll();
  let [adress, date, className, fullname] = test;

  $("#EditInputFullname").val($(fullname).text());
  $("#Editclass").val($(className).text());
  $("#EditdateOfBirth").val($(date).text());
  $("#Editaddress").val($(adress).text());
});

//  Event Untuk Tombol Action Delete
$(document).on("click", "button.delete", function (e) {
  let user = $(this).parent().prevAll('.tableNamaAnggota').text();
  $('#deleteModal div div.modal-content div.modal-body')
    .html(`Are you sure you want to remove <strong>${user}</strong> from the library members ?`);
  $("#deleteModal").modal("toggle");
});

// Event saat baris diklik
$("table#dataTable > tbody > tr").on("click", function (e) {
  if (!$(e.target).is(".actionTable , .fa-edit, .fa-trash, .edit, .delete")) {
    // Check Apakan orang tua dari element yang diklik mempunyai class active
    if ($(e.target).parent().hasClass("active")) {
      // Jika Sudah tidak ada baris yang mempunyai class active maka hilangkan attribute
      if (($($("table#dataTable > tbody > tr.active")).length - 1) <= 0) disabledOrNo(false)
    // Nonaktifkan Tombol Action dan add member
    } else disabledOrNo(true)

    // Toggle Class Active
    $(this).toggleClass("active");

    // Tampilkan Jumlah Rows / Hilangkan Jika tidak ada baris yang dipilih
    let jumlahRows = $("table#dataTable > tbody > tr.active").length;
    if (jumlahRows <= 0) $("#rowSelect").html(``);
    else $("#rowSelect").html(`${jumlahRows} rows selected`);
  }
});

// Modal Box Delete By
$("#deleteModalByButton").on("click", function (e) {
  let rowActive = $("table#dataTable > tbody > tr.active").length;
  let coloumName = $("table#dataTable > tbody > tr.active");
  let searchByColoum = cariBaris("#dataTable tbody tr", ".tableClass", '12 Rpl 1');
  let group = $('#deleteModalBy div div.modal-content div.modal-body .form-group:eq(1)');

  // Jika anda baris yang aktif
  if (rowActive >= 1){ 
    tampilkanNama(coloumName, 1, true);
    $("#deleteBy").val("rows");
    group.css('display', 'none')
  };
  if (rowActive === 0) {
    $("#deleteBy").val("class");
    group.css('display', 'block')
    return tampilkanNama(searchByColoum, 2, true)
  };
});


// Event Select Option Class
// Event Select Option By
$('#deleteBy').on('change', function(e){
  let value = $(this).val();
  let alertSelection = $('#deleteModalBy div div.modal-content div.modal-body .form-group:eq(1)');
  let rows = $("table#dataTable > tbody > tr.active");

  // Jika Nilainya sama dengan 'rows'
  if(value == 'rows') {
    // Jika user belum select rows apapun maka tampilkan modal 
    if($(rows).length <= 0){
      $("#deleteModalBy").modal("hide");
      $('#multiguna').modal('toggle');
    } else {
      tampilkanNama(rows, 1, false);
      alertSelection.css('display', 'none');
    }

  }
  
  // Jika Nilainya Class
  if(value == "class") {
    let two = cariBaris("#dataTable tbody tr", ".tableClass", '12 Rpl 1');
    alertSelection.css('display', 'block');
    tampilkanNama(two, 2, false)
  }
});

$('#deleteByClass').on('change', function(e){
  let value = cariBaris("#dataTable tbody tr", ".tableClass", $(this).val());
  tampilkanNama(value, 2, false);
});

// Hilangkan class aktif saat user mengklik tombol close
$('#deleteModalBy .modal-footer button:first-child, #deleteModalBy .modal-header button').on('click' , function(e){
  disabledOrNo(false)
  let rowsActive = $('table#dataTable > tbody > tr.active');
  $.each(rowsActive, (i, e) => $(e).removeClass('active'));
  $("#rowSelect").html(``);
})



// Fungsi Utama adalah untuk mengambil nama dari kelas yang aktif
// Menerima 3 argument yaitu
// Argument Pertama user1 sebagai data yang mau ditampilkan
// Argument Kedua jika bernilai 1 maka function akan mengambil nilainya dengan method jquery text
// Argument ke 3 jika nilainya true maka modal nya akan ditoggle
function tampilkanNama(user1, state, toggleee) {
  let namaUser = "";
  $.each(user1, function (i, e) {
    let user = state == 1 ? $(e).children('.tableNamaAnggota').text() : e;
    if (user1.length > 5) {
      if (i === 1) namaUser += `${user}, ... ,`;
      if (i === user1.length - 1) namaUser += `${user}`;
    } else {
      namaUser += `${user}`;
      if (i < user1.length - 1) namaUser += ", ";
    }
  });
  if(toggleee) $("#deleteModalBy").modal("toggle");
  // Beri Peringatan kepada users
  $('#deleteModalBy div div.modal-content div.modal-body .form-group:last-child .alert')
    .html(
      `Are you sure you want to remove <strong>${namaUser}</strong> from the library members ?`
    );
};

// Mencari Baris dengan coloum yang sesuai dengan 'value'
// Untuk Mencari Bari dengan nama tertentu
// Argument pertama adalah letak element tabel
// Argument Kedua adalah coloum yang ingin dicari
// Argument Ketiga adalah nilai yang mau dicarinya
function cariBaris(querySearch, coloum, search){
  querySearch = $(querySearch);
  let value = [];
  $.each(querySearch, function (i, e) {
    if ($(e).children(coloum).text() == search) value.push($(e).children('.tableNamaAnggota').text());
  });
  return value
}

// Fungsinya adalah untuk memberikan disabled pada beberapa tombol
function disabledOrNo(state) {
  let tombolAction = $("table#dataTable > tbody > tr > td.actionTable");
  if(state){
    $.each($(tombolAction).children(), (i, e) => $(e).prop("disabled", true).css("cursor", "not-allowed"));
    $('.actionMenu button:first-child').prop('disabled', true).css('cursor' , 'not-allowed');
  } else {
    $('.actionMenu button:first-child').removeAttr('style').removeAttr('disabled')
    $.each($(tombolAction).children(), (i, e) => $(e).removeAttr("disabled").removeAttr("style"));
  }
}