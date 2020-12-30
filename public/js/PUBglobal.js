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
            `Page Thickness: ${d.book_page_thickness} <br>` +
            `Isbn: ${d.book_isbn} <br>` +
            `Publisher : ${d.book_publisher} <br>` +
            `CreateAt : ${d.createdAt} <br>` +
            `UpdateAt : ${d.updatedAt}`
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
              targets: 5,
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
              row.child(format(ambilAttribute(row[0][0], 'hidden'))).show();

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
      let newObj = MixRowsAndAttrs(this, obj, true);

      // generate modal Body with type
      const result = modalBody(newObj, arVal);
      
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
      const judul = $(
        "#content > div > div.d-sm-flex.align-items-center.justify-content-between.mb-4 > h1"
      )
        .html()
        .toLowerCase();
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
      $("#modalMultiGuna").modal("show");
      const option = ambilOption();
      modalGenerate(
        "Delete by",
        [
          {
            name: "Delete By",
            value: ["Delete by Class", "Delete by selected row"],
            type: "select",
            id: true,
          },
          { name: "Class", value: option, type: "select", id: "deleteByClass" },
          {type: 'div' , class: 'alert alert-danger'}
        ],
        [{ class: "btn-danger", name: "DELETE" }]
      );

      let rowActive = $("table#tabelUtama > tbody > tr.active");

      // let coloumName = $("table#tabelUtama > tbody > tr.active");
      let searchByColoum = cariBaris(
        "#tabelUtama tbody tr",
        "[data-group=true]",
        option[0]
      );

      let group = $(`#modalMultiGuna > div > div > div.modal-body > div:nth-child(2)`);
      const optionELement = $('#deleteBy option');
      // Jika anda baris yang aktif
      if ($(rowActive).length >= 1) {
        const optAttr = optionELement[1].getAttribute('value');
        $("#deleteBy").val(optAttr);
        tampilkanNama(rowActive, 1, true);
        group.css("display", "none");
      }
      if ($(rowActive).length === 0) {
        const optAttr = optionELement[0].getAttribute('value');
        $("#deleteBy").val(optAttr);
        group.css("display", "block");
        return tampilkanNama(searchByColoum, 2, true);
      }
    });

    // Event Select Option Class
    // Event Select Option By
    $(document).on("change", '#deleteBy', function (e) {
      let value = $(this).val();
      let rows = $("table#tabelUtama > tbody > tr.active");
      let group = $(`#modalMultiGuna > div > div > div.modal-body > div:nth-child(2)`);

      // Jika Nilainya sama dengan 'rows'
      if (value == "Selected") {
        group.css('display', 'none');
        // Jika user belum select rows apapun maka tampilkan modal
        if ($(rows).length <= 0) {
          modalGenerate('Warning', 
          {tunggal: `<div class="form-group"><div class="alert alert-danger"><strong>Please select the row first</strong></div></div>`}
          , [])
        } else tampilkanNama(rows, 1, false);
      }
      
      // Jika Nilainya Class
      if (value == "Class") {
        const option = ambilOption();
        let searchByColoum = cariBaris(
          "#tabelUtama tbody tr",
          "[data-group=true]",
          option[0]
          );
        group.css('display', 'block');
        tampilkanNama(searchByColoum, 2, false);
      }
    });

    // Event change untuk input class dideleteByModal
    $(document).on("change", "#deleteByClass", function (e) {
      const nilai = $(this).val().toLowerCase();
      let value = cariBaris(
        "#tabelUtama tbody tr",
        "[data-group=true]",
        nilai
      );
      tampilkanNama(value, 2, false);
    });

    // Hilangkan class aktif saat user mengklik tombol close
    $("#modalMultiGuna").on("click", "[data-dismiss=modal]", function (e) {
      disabledOrNo(false);
      $("table#tabelUtama > tbody > tr.active").removeClass("active");
      $("#rowSelect").css("opacity", "0");
    });

    // Add Modal
    $(document).on('click', '#addMember', function(e){
      $('#modalMultiGuna').modal('show');
      // let dataHide = $('#tabelUtama thead tr');
      // dataHide = dataHide.data('hidden').split('/-/');
      // dataHide.pop();
      // let obj = [];
      // $.each($('#tabelUtama thead tr').children(), function(i, e){
      //   if(i !== 0 && i !== ($('#tabelUtama thead tr').children().length - 1)) {
      //     dataHide.push($(e).text())
      //   }
      // });
      // console.log(dataHide)
      // dataHide.forEach(function(e,i){
      //   if(i == 0 ) obj.push({name: e, typeInput: 'hidden'})
      //   else if(i !== (dataHide.length - 1) &&  i !== (dataHide.length - 2)) {
      //     obj.push({name: e.split('_')[1], type: 'input'})
      //   };
        
      // });
      
      // $('#modalMultiGuna').modal('show');
      // modalGenerate('Add', obj , [{name: 'Add', class: 'btn-primary'}]);
      let option = ambilOption();
      let attr = ambilAttribute(0, 'hidden', '#tabelUtama > thead > tr');
      let newAttr = MixRowsAndAttrs(this, attr);
      let modalBo = modalBody(newAttr, option);

      modalGenerate('Add', modalBo, [{name: 'Add', class: 'btn-primary'}])
      
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
        let nameOrTitle = $(e).children("[data-identifier=true]").text();
        let user = nameOrTitle.length >= 1 ? nameOrTitle : e;

        // Jika user1 lebih besar dari pada 5 maka
        if (user1.length > 5) {
          if (i === 1) namaUser += `${user}, ... ,`;
          if (i === user1.length - 1) namaUser += `${user}`;
        } else {
          namaUser += `${user}`;
          if (i < user1.length - 1) namaUser += ", ";
        }

      });
      
      const judul = $('#content > div > div.d-sm-flex.align-items-center.justify-content-between.mb-4 > h1').text();
      let buttonFooter = $('#modalMultiGuna > div > div > div.modal-footer > button');
      let text = `Are you sure you want to remove <strong>${namaUser}</strong> from ${judul} ?`;
      if (user1.length <= 0 ) {
        text = "Not found";
        $.each(buttonFooter, (i,e) => {
          if( i != 0 ) $(e).prop('disabled', true)
        })
      } else {
        $.each(buttonFooter, (i,e) => {
          if( i != 0 ) $(e).removeAttr('disabled')
        })
      }
      // Beri Peringatan kepada users
      $(
        `#modalMultiGuna > div > div > div.modal-body > div:nth-child(3) > div`
      ).html(
        text
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
        if (hapusSpasi($(e).children(coloum).text()) == search) {
          value.push($(e).children("[data-identifier=true]").text());
        }
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

    function ambilAttribute(i, where, ambil) {
      where = where == undefined ? "hidden" : where ;
      ambil = ambil == undefined ? '#tabelUtama > tbody tr[role=row]' : ambil;
      let test = {};
      let tr = document.querySelectorAll(ambil);
      let data = tr[i].dataset[where];
      let dataPotong = data.split('/-/');
      dataPotong.forEach(function(e,i){
        if(e.length > 0) {
          let pecah = e.split("="); // THis is Value
          
          let ii = pecah.length - 1;
          let pecah2 = pecah[ii].split('/');
          let judul = pecah.length > 1 ? pecah[0] : pecah2[0];
          let val = pecah2[1].length <= 1 ? '' : pecah2[1];
          let textValue = pecah.length > 1 ? pecah2[0] : ''
          
          test[judul] = [val, textValue]
    
          
        }
      })
      
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

    function MixRowsAndAttrs(el, obj, value) {
      let test = $(el).parent().prevAll();
      const thead = document.querySelector("#tabelUtama > thead");
      const tHeadChild = Array.from(thead.children[0].children);
      let newObj = {};
      
      $.each(tHeadChild, function (i, e) {
        let index = $(e).nextAll().length - 1;
        if (i !== 0 && tHeadChild.length - 1 !== i) {
          let data = e.dataset.as;
          let name = e.dataset.name;
          
          if (data != undefined) newObj[name] = [data];
          
          if(value == true) nilai = test[index].textContent;
          else nilai = '';

          // Jika Array
          if( typeof newObj[name] == 'object' && newObj[name] !== undefined ) newObj[name].push(nilai);
          else newObj[name] = nilai
          
        }
  
      });
      
      let mix = {...obj, ...newObj};
      return mix
    }

    function modalBody(obj, arVal) {
      let result = new Array;
      let keyObj = Object.keys(obj);
      let valObj = Object.values(obj);
      
      valObj.forEach(function (e, i) {
        if(keyObj[i] != 'updatedAt' && keyObj[i] !== 'createdAt') {
          if(i == 0 && e[1].length <= 0) return
          let result2 = {};
          
          
          result2.name = ambilKata(keyObj[i], '_', 'all', [0]);
          result2.realName = keyObj[i];
          result2.value = e[0] == 'group' ? arVal : e;
          result2.type = `input`;
          result2.id = true;

          if(typeof e == 'object') {
            if(e[0] == 'group') {
              result2.type = 'select';
              result2.id = 'inputClass'
              result2.value = arVal;
              result2.name = ambilKata(keyObj[i], '_', 'all', [1]);

            } else if(e[0] == 'image') result2.typeInput = 'file'
            else {
              result2.typeInput = i == 0 ? 'hidden' : 'input';
              result2.type = i == 0 ? 'ff' : 'input';
              result2.value = e[1];
            }
          }

          // Masukan 
          result.push(result2)
        }
        
      });
      return result;
    }

    function setModalNilai(i) {
      let li = document.querySelectorAll("#tabelUtama > tbody > tr");
      let inChild = Array.from(li[i].children);
      inChild.forEach(function (e, i) {
        if (e.matches("[data-group=true]")){
          document.getElementById("inputClass").value = e.textContent;
        }
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

      if (bodyComponent.tunggal != undefined) body.innerHTML = `<div>${bodyComponent.tunggal}</div>`;
      else {
        bodyComponent.forEach((e, i) => {
          let input = e.typeInput == undefined ? "input" : e.typeInput;
          let place = e.place == undefined ? `Enter ${e.name}` : e.place;
          let value = e.value === undefined ? "" : e.value;
          let classElement = e.class === undefined ? "" : e.class;
          place = value !== "" ? "" : place;
      
          if(e.id !== undefined) {
            e.id = e.id === true ? `${e.name}` : e.id;
            e.id = ubahHurufPertama(e.id, 'kecil');
            let poto = e.id.split(' ');

            if(poto.length > 1) {
              e.id = '';
              poto.forEach(element => e.id += element );
            } else e.id = poto[0]
          } else e.id = ''

          html += `<div class="form-group">`;
          if (e.type == "select") {
            html += `<label for="InputFullname">${e.name} : </label><select class="custom-select custom-select-sm form-control form-control-sm mb-2" id="${e.id}"  aria-controls="dataTable" S>`;
            if(e.value !== undefined) {
              e.value.forEach((e) => {
                let val = ambilKata(e, ' ', 2, []);
                if( val.length <= 0 ) val = ambilKata(e, ' ', 'all', []);
                 html += `<option value="${val.toLowerCase()}">${e}</option>`
              })
            }
            html += `</select>`;
          } else if (e.type == 'div') html += `<div class="${classElement}"></div>`
          else {
            console.log(e.name, e.type)
            if(e.type == 'input') html += `<label for="InputFullname">${e.name} : </label>`
            html += `<input class="form-control" id="Input${e.name}" type="${input}" aria-describedby="${e.name}" placeholder="${place}" value="${value}"/>`;
          }

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

    // Jadikan huruf pertama dari suatu kata menjadi besar
    function ubahHurufPertama(word, mau) {
      // Ambil Bagian nomor depan
      let potongan = word.slice(0, 1);
      // Ubah Jadi Huruf besar
      potongan = mau === undefined ? potongan.toUpperCase() : potongan.toLowerCase() ;
      // Potong dari 0 sampai akhir
      word = word.slice(1);
      // Gabungkan
      potongan += word;
      // Kirim Potongannya
      return potongan;
    }

    // untuk menambil kata ke-berapa dari string
    function ambilKata(word, pemisah, ambil, without) {
      let word2 = word.split(pemisah);
      let result = "";
      word2.forEach(function (e, i) {
        e = ubahHurufPertama(e);
        // Jika argument ambil sama dengan number
        if (typeof ambil == "number") {
          if (i == ambil) result += e;
        } else if (typeof ambil == "object") {
          if (termasuk(ambil, i) == true) result += `${e} `;
        } else if (typeof ambil == "string") {
          if (word2.length > without.length) {
            if (gaTermasuk(without, i) == true) result += `${e} `;
          } else result += `${e} `;
        }
      });

      result = result.trim();

      return result;
    }

  }
};
