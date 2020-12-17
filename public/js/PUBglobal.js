document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // Tambahkan classActive saat load
    let testVariabelActive = document.getElementById("accordionSidebar");
    let testLi = testVariabelActive.getElementsByTagName("li");
    for (let e of testLi) {
      let navActive = testVariabelActive.getAttribute("navBarActive");
      if (navActive == e.getAttribute("name")) e.classList.add("active");
    }

    function tabel(dataTabel) {
      let navActiveName = $('#accordionSidebar > li.active').attr('name');
    
      if (navActiveName == "member") {
        let t = $("#tabelUtama").DataTable({
          columnDefs: [
            {
              searchable: false,
              orderable: false,
              targets: 0,
            },
            {
              searchable: false,
              orderable: false,
              targets: 6,
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
            `Publisher : ${d.book_publisher}`
          );
        }

        var dt = $("#tabelUtama").DataTable({
          columnDefs: [
            {
              searchable: false,
              orderable: false,
              targets: 0,
              class : 'details-control',
              defaultContent: ""
            },
          ],
          order: [[1, "asc"]],
        });
        
        // Array to track the ids of the details displayed rows
        var detailRows = [];
        
        $("#tabelUtama tbody").on("click", "tr td.details-control", function () {
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
            row.child(format(dataTabel.data[row[0][0]])).show();

            // Add to the 'open' array
            if (idx === -1) {
              detailRows.push(tr.attr("id"));
            }
          }
        });

        // On each draw, loop over the `detailRows` array and show any child rows
        dt.on("draw", function () {
          $.each(detailRows, function (i, id) {
            $("#" + id + " td.details-control").trigger("click");
          });
        });
      }
    }

    // Jalankan
    let liActive = document.querySelector('#accordionSidebar > li.active');
    let aHref = `${liActive.getAttribute('name')}?as=string`;
    fetch(aHref)
      .then(result => result.json())
      .then(result => tabel(result.data));

    // Event Ajax Saat klik navbar
    let navLi = document.querySelectorAll("#accordionSidebar > li");
    navLi.forEach(function (e) {
      e.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(this)
        let aHref = `${this.children[0].getAttribute("href")}?as=string`;
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
  }
};
