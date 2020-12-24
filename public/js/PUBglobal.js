document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // Tambahkan class Active pada li saat load
    let testVariabelActive = document.getElementById("accordionSidebar");
    let testLi = testVariabelActive.getElementsByTagName("li");
    for (let e of testLi) {
      let navActive = testVariabelActive.getAttribute("navBarActive");
      if (navActive == e.getAttribute("name")) {
        e.classList.add("active");
        testVariabelActive.removeAttribute("navBarActive");
      }
    }

    function tabel(dataTabel) {
      let navActiveName = $("#accordionSidebar > li.active").attr("name");

      if (navActiveName == "member") {
        let t = $("#tabelUtama").DataTable({
          columnDefs: [
            {
              searchable: false,
              orderable: false,
              targets: [0, 6],
            },
          ],
          order: [[2, "asc"]],
        });

        t.on("order.dt search.dt", function () {
          t.column(0, { search: "applied", order: "applied" })
            .nodes()
            .each(function (cell, i) {
              cell.innerHTML = i + 1;
            });
        }).draw();
      } else if (navActiveName == "book") {
        function format(d) {
          return (
            `Page Thickness: ${d.thickness} <br>` +
            `Isbn: ${d.isbn} <br>` +
            `Publisher : ${d.publisher}`
          );
        }

        var dt = $("#tabelUtama").DataTable({
          columnDefs: [
            {
              searchable: false,
              orderable: false,
              targets: 0,
              class: "details-control",
              defaultContent: "",
            },
            {
              searchable: false,
              orderable: false,
              targets: 4,
            },
          ],
          order: [[1, "asc"]],
        });

        // Array to track the ids of the details displayed rows
        var detailRows = [];

        $("#tabelUtama tbody").on(
          "click",
          "tr td.details-control",
          function () {
            var tr = $(this).closest("tr");
            var row = dt.row(tr);
            var idx = $.inArray(tr.attr("id"), detailRows);

            if (row.child.isShown()) {
              tr.removeClass("details");
              row.child.hide();

              // Remove from the 'open' array
              detailRows.splice(idx, 1);
            } else {
              tr.addClass("details");
              // let attr = ambilAttribute(row[0][0]);
              // console.log(attr[row[0][0]])
              row.child(format(ambilAttribute(row[0][0]))).show();

              // Add to the 'open' array
              if (idx === -1) {
                detailRows.push(tr.attr("id"));
              }
            }
          }
        );

        // On each draw, loop over the `detailRows` array and show any child rows
        dt.on("draw", function () {
          $.each(detailRows, function (i, id) {
            $("#" + id + " td.details-control").trigger("click");
          });
        });
      }
    }

    // // Jalankan
    tabel();

    // Event Ajax Saat klik navbar
    let navLi = document.querySelectorAll("#accordionSidebar > li");
    navLi.forEach(function (e) {
      e.addEventListener("click", function (e) {
        e.preventDefault();
        let aHref = `${this.children[0].getAttribute("href")}?as=html`;
        let test = fetch(aHref)
          .then((result) => result.json())
          .then((result) => {
            let element = document.getElementById("content");
            let element2 = element.getElementsByTagName("div");
            let navLiActive = document.querySelectorAll(
              "#accordionSidebar > li.active"
            );

            element2[42].innerHTML = result.html;
            // Tambahkan class Active pada navbar yang dipilih
            navLiActive.forEach((e) => e.classList.remove("active"));
            this.classList.add("active");

            // Ubah Title
            aHref2 = aHref.split("/");
            aHref2 = aHref2[1].split("?");

            // Ubah huruf awal jadi huruf besar
            let hurufPertama = aHref2[0].slice(0, 1);
            let hurufSelanjutnya = aHref2[0].slice(1);
            hurufPertama = hurufPertama.toUpperCase();
            hurufPertama += hurufSelanjutnya;

            document.querySelector(
              "title"
            ).innerHTML = `Elbi Library | ${hurufPertama}`;

            // Load Datatabel
            tabel(result.data);

            //- Ganti Url
            let stateObj = { id: "100" };
            window.history.replaceState(stateObj, "r", aHref2[0]);
          });
      });
    });

    // Event table
    ("use strict");

    // Event Klik Untuk Tombol Action Edit
    $(document).on("click", "button.edit", function (e) {
      $("#modalMultiGuna").modal("toggle");

      // ambil Option
      let arVal = ambilOption();

      // Dapatkan Index Li
      let hasilIndex = ambilIndexLi(this);

      // Ambil Attribute bedasarkan coloumn yang diklik
      let obj = ambilAttribute(hasilIndex);

      // Gabungkan Baris dengan Attibute
      MixRowsAndAttrs(this, obj);

      // generate modal Body with type
      const result = modalBody(obj, arVal);
      
      // Panggil Fungsi Modal-generate
      modalGenerate("Update", result, [
        {
          class: "btn-primary",
          name: "update",
        },
      ]);

      // Setel Nilai Default modal category
      setModalNilai(hasilIndex);
    });

    //  Event Klik Untuk Tombol Action Delete
    $(document).on("click", "button.delete", function (e) {
      let user = $(this).parent().prevAll("[data-identifier=true]").text();
      const judul = $('#content > div > div.d-sm-flex.align-items-center.justify-content-between.mb-4 > h1').html().toLowerCase();
      $("#modalMultiGuna").modal("toggle");
      modalGenerate(
        "Delete",
        {
          tunggal: `Are you sure you want to remove <strong>${user}</strong> from ${judul} ?`,
        },
        [{ class: "btn-danger", name: "delete" }]
      );
    });

    // Event saat baris diklik
    $(document).on("click", "table#tabelUtama > tbody > tr", function (e) {
      if (
        !$(e.target).is(
          ".actionTable , .fa-edit, .fa-trash, .edit, .delete, .details-control"
        )
      ) {
        // Check Apakan orang tua dari element yang diklik mempunyai class active
        if ($(e.target).parent().hasClass("active")) {
          // Jika Sudah tidak ada baris yang mempunyai class active maka hilangkan attribute
          if ($($("table#tabelUtama > tbody > tr.active")).length - 1 <= 0)
            disabledOrNo(false);
          // Nonaktifkan Tombol Action dan add member
        } else disabledOrNo(true);

        // Toggle Class Active
        $(this).toggleClass("active");

        // Tampilkan Jumlah Rows / Hilangkan Jika tidak ada baris yang dipilih
        let jumlahRows = $("table#tabelUtama > tbody > tr.active").length;
        if (jumlahRows <= 0) $("#rowSelect").css("opacity", "0");
        else
          $("#rowSelect")
            .html(`${jumlahRows} rows selected`)
            .css("opacity", "1");
      }
    });

    // Modal Box Delete By
    $(document).on("click", "#deleteModalByButton", function (e) {
      let rowActive = $("table#tabelUtama > tbody > tr.active");
      // let coloumName = $("table#tabelUtama > tbody > tr.active");
      let searchByColoum = cariBaris(
        "#tabelUtama tbody tr",
        ".tableClass",
        "12 Rpl 1"
      );

      let group = $(
        "#deleteModalBy div div.modal-content div.modal-body .form-group:eq(1)"
      );

      // Jika anda baris yang aktif
      if ($(rowActive).length >= 1) {
        tampilkanNama(rowActive, 1, true);
        $("#deleteBy").val("rows");
        group.css("display", "none");
      }
      if ($(rowActive).length === 0) {
        $("#deleteBy").val("class");
        group.css("display", "block");
        return tampilkanNama(searchByColoum, 2, true);
      }
    });

    // Event Select Option Class
    // Event Select Option By
    $("#deleteBy").on("change", function (e) {
      let value = $(this).val();
      let alertSelection = $(
        "#deleteModalBy div div.modal-content div.modal-body .form-group:eq(1)"
      );
      let rows = $("table#tabelUtama > tbody > tr.active");

      // Jika Nilainya sama dengan 'rows'
      if (value == "rows") {
        // Jika user belum select rows apapun maka tampilkan modal
        if ($(rows).length <= 0) {
          $("#deleteModalBy").modal("hide");
          $("#multiguna").modal("toggle");
        } else {
          tampilkanNama(rows, 1, false);
          alertSelection.css("display", "none");
        }
      }

      // Jika Nilainya Class
      if (value == "class") {
        let two = cariBaris("#tabelUtama tbody tr", ".tableClass", "12 Rpl 1");
        alertSelection.css("display", "block");
        tampilkanNama(two, 2, false);
      }
    });

    // Event change untuk input class dideleteByModal
    $("#deleteByClass").on("change", function (e) {
      let value = cariBaris(
        "#tabelUtama tbody tr",
        ".tableClass",
        $(this).val()
      );
      tampilkanNama(value, 2, false);
    });

    // Hilangkan class aktif saat user mengklik tombol close
    $(
      "#deleteModalBy .modal-footer button:first-child, #deleteModalBy .modal-header button"
    ).on("click", function (e) {
      disabledOrNo(false);
      $("table#tabelUtama > tbody > tr.active").removeClass("active");
      $("#rowSelect").css("opacity", "0");
    });

    // // Event saat
    // $('#modifyClass').on('click', function(event){
    //   $('#modifyClassModal').modal('toggle');
    //   console.log($(this).css('display', 'inline-block'))
    // })

    // Event change untuk input yang ada diModify Class
    $("#modifyAction").on("change", function (event) {
      let value = $(this).val();
      let modalBody = $("#modifyClassModal .modal-body");

      // Jika nilainya add
      if (value === "Add") {
        $(modalBody).children(".modifyAddClass").removeClass("d-none");
        $(modalBody).children(".modifyClass").addClass("d-none");
        $(modalBody)
          .children(".modifyAddClass")
          .children("label")
          .html("Add Class :");
      }
      // Jika nilai nya delete
      if (value === "Delete") {
        $(modalBody).children(".modifyAddClass").addClass("d-none");
        $(modalBody).children(".modifyClass").removeClass("d-none");
      }

      // Jika nilainya update
      if (value === "Update") {
        $(modalBody).children(".modifyAddClass").removeClass("d-none");
        $(modalBody).children(".modifyClass").removeClass("d-none");
        $(modalBody)
          .children(".modifyAddClass")
          .children("label")
          .html("Update Class :");
      }

      $("#modifyClassModal .modal-footer button:last-child").html(
        `${value} class`
      );
    });

    // Fungsi Utama adalah untuk mengambil nama dari kelas yang aktif
    // Menerima 3 argument yaitu
    // Argument Pertama user1 sebagai data yang mau ditampilkan
    // Argument Kedua jika bernilai 1 maka function akan mengambil nilainya dengan method jquery text
    // Argument ke 3 jika nilainya true maka modal nya akan ditoggle
    function tampilkanNama(user1, state, toggleee) {
      let namaUser = "";
      $.each(user1, function (i, e) {
        let nameOrTitle =
          $(e).children(".tableName").text() == ""
            ? $(e).children(".tableTitle").text()
            : $(e).children(".tableName").text();
        let user = state == 1 ? nameOrTitle : e;
        // Jika user1 lebih besar dari pada 5 maka
        if (user1.length > 5) {
          if (i === 1) namaUser += `${user}, ... ,`;
          if (i === user1.length - 1) namaUser += `${user}`;
        } else {
          namaUser += `${user}`;
          if (i < user1.length - 1) namaUser += ", ";
        }
      });
      if (toggleee) $("#deleteModalBy").modal("toggle");
      // Beri Peringatan kepada users
      $(
        "#deleteModalBy div div.modal-content div.modal-body .form-group:last-child .alert"
      ).html(
        `Are you sure you want to remove <strong>${namaUser}</strong> from the library members ?`
      );
    }

    // Mencari Baris dengan coloum yang sesuai dengan 'value'
    // Argument pertama adalah letak element tabel
    // Argument Kedua adalah coloum yang ingin dicari
    // Argument Ketiga adalah nilai yang mau dicarinya
    function cariBaris(querySearch, coloum, search) {
      querySearch = $(querySearch);
      // Hapus baris yang terdapat dan kecilkan semua huruf
      search = hapusSpasi(search);
      let value = [];
      $.each(querySearch, function (i, e) {
        if (hapusSpasi($(e).children(coloum).text()) == search)
          value.push($(e).children(".tableName").text());
      });
      return value;
    }

    // Fungsinya adalah untuk memberikan disabled pada beberapa tombol
    function disabledOrNo(state) {
      if (state)
        $(".disableButton").prop("disabled", true).css("cursor", "not-allowed");
      else $(".disableButton").removeAttr("style").removeAttr("disabled");
    }

    function hapusSpasi(word) {
      word = word.split(" ");
      let search2 = "";
      word.forEach((e) => (search2 += e.toLowerCase()));
      return search2;
    }

    function ambilAttribute(i) {
      let test = {};
      let tr = document.querySelectorAll("#tabelUtama > tbody tr[role=row]");
      for (let j = 0; j < tr[i].attributes.length - 4; j++) {
        let name = tr[i].attributes[j].nodeName.split("-")[1];
        test[name] = tr[i].attributes[j].nodeValue;
      }

      return test;
    }

    function gaTermasuk(dont, value) {
      let i = 0;
      if (dont.length > 0) {
        for (let a of dont) {
          // Jika Value sama dengan element didalam dont maka return false
          if (a === value) return false;
          // return true saat 'i' == dont length. Mengapa saya tidak mengecheck nilai yang sama lagi ? Kerena telah dicheck oleh 'if'  diatas
          if (i === dont.length - 1) return true;
          i++;
        }
      } else return true;
    }

    function ambilOption() {
      // Ambil Option
      const option = document.querySelectorAll("#inputShowClass > option");
      const arVal = [];
      option.forEach(function (e, i) {
        if (i !== 0) arVal.push(e.textContent);
      });
      return arVal;
    }

    function ambilIndexLi(el) {
      let li = document.querySelectorAll("#tabelUtama > tbody > tr");
      let li2 = el.parentElement.parentElement;
      let hasilIndex;
      li.forEach(function (e, i) {
        if (e == li2) hasilIndex = i;
      });
      return hasilIndex;
    }

    function MixRowsAndAttrs(el, obj) {
      let test = $(el).parent().prevAll();
      const thead = document.querySelector("#tabelUtama > thead");
      const tHeadChild = Array.from(thead.children[0].children);

      $.each(tHeadChild, function (i, e) {
        let index = $(e).nextAll().length - 1;
        if (i !== 0 && tHeadChild.length - 1 !== i)
          obj[e.textContent] = test[index].textContent;
      });
    }

    function modalBody(obj, arVal) {
      let result = [];
      const keyObj = Object.keys(obj);
      const valObj = Object.values(obj);
      const option = ambilOption();
      valObj.forEach(function (e, i) {
        if (i !== 0) {
          let rst = {};
          rst.name = keyObj[i];
          for(let opt in option) {
              if(option[opt] == e) {
                rst.value = ambilOption();
                rst.type = "select";
                result.push(rst);
                return
              } else {
                rst.value = e;
                rst.type = "input";
              }           
          }
          result.push(rst);
        }
      });

      return result;
    }

    function setModalNilai(i) {
      let li = document.querySelectorAll("#tabelUtama > tbody > tr");
      let inChild = Array.from(li[i].children);
      inChild.forEach(function (e, i) {
        if (e.matches('[data-group=true]'))document.getElementById("inputClass").value = e.textContent;
      });
      return "success";
    }

    function modalGenerate(headerName, bodyComponent, footerComponent) {
      const header = document.getElementById(`multigunaHeader`);
      const body = document.querySelector(
        "#modalMultiGuna > div > div > div.modal-body"
      );
      const footer = document.querySelector(
        "#modalMultiGuna > div > div > div.modal-footer"
      );

      // Penerapan
      header.innerHTML = headerName;

      body.innerHTML = "";
      let html = "";
      if (bodyComponent.tunggal != undefined)
        body.innerHTML = `<div>${bodyComponent.tunggal}</div>`;
      else {
        bodyComponent.forEach((e, i) => {
          let input = e.typeInput == undefined ? "input" : e.typeInput;
          let place = e.place == undefined ? `Enter ${e.name}` : e.place;
          let value = e.value === undefined ? "" : e.value;
          place = value !== "" ? "" : place;

          html += `<div class="form-group"><label for="InputFullname">${e.name} : </label>`;
          if (e.type == "select") {
            html += `<select class="custom-select custom-select-sm form-control form-control-sm mb-2" id="inputClass"  aria-controls="dataTable" value="${value}">`;
            e.value.forEach(
              (e) => (html += `<option value="${e}">${e}</option>`)
            );
            html += `</select>`;
          } else
            html += `<input class="form-control" id="Input${e.name}" type="${input}" aria-describedby="${e.name}" placeholder="${place}" value="${value}"/>`;

          html += `</div>`;

          // Saat Terakhir
          if (i == bodyComponent.length - 1) body.innerHTML = html;
        });
      }

      // Bagian Footer
      footer.innerHTML = `<button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>`;
      footerComponent.forEach(
        (e) =>
          (footer.innerHTML += `<button class="btn ${e.class}" type="button" >${e.name}</button>`)
      );
    }
    // Akir Event table
  }
};
