module.exports = function (data) {
  let { without, coloumn, additional, elementName, type, category } = data;
  let { heading, buttonName1, buttonName2, buttonName3 } = elementName;

  let mix = data.mix.yes;
  let dataMix = data.mix.data;


  function bodyHtml() {
    // if (type == "table") {
      let test = ``;
      let body = `
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">${heading}</h1>
              <div class="actionMenu">
                <!-- Class-->
                <button class="btn btn-primary disableButton" id="modifyClass" type="button" data-toggle="modal" data-target="#modifyClassModal" title="Modify library members" aria-describe="Modify library members"><span class="icon text-white-50"><i class="${buttonName1.icon}"></i></span><span class="text">${buttonName1.name}</span></button>
                <!-- Add Member-->
                <button class="btn btn-primary disableButton" type="button" data-toggle="modal" data-target="#addMember" title="Add library members" aria-describe="Add library members"><span class="icon text-white-50"><i class="${buttonName2.icon}"></i></span><span class="text">${buttonName2.name}</span></button>
                <!-- End add member-->
                <!-- Remove All-->
                <button class="btn btn-danger" id="deleteModalByButton" type="button" data-toggle="modal" data-target="#removeMember" title="Remove class-based members or based on selected rows" aria-describe="Remove class-based members or based on selected rows"><span class="icon text-white-50"><i class="${buttonName3.icon}"></i></span><span class="text">${buttonName3.name}</span></button>
                <!-- End of remove all-->
              </div>
            </div>
            <div class="card shadow mb-4">
              <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
              <h6 class="font-weight-bold text-primary mb-0" id="rowSelect">1 rows selected</h6>
              <select class="custom-select custom-select-sm form-control form-control-sm ml-3" id="inputShowClass" name="deleteByClass" aria-controls="dataTable">
                <option value="all">All</option>
                <option value="12 Rpl 1">12 Rpl 1</option>
                <option value="12 Rpl 2">12 Rpl 2</option>
                <option value="12 Rpl 3">12 Rpl 3</option>
              </select>
                
              </div>
              <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered display" id="tabelUtama" width="100%" cellspacing="0">
                  <thead>
                    <tr>`;

      let i = 0;

      body += looping(0, '', additional, 'th', false);
      test += looping(0, '', additional, 'th', false);
      for(let col in coloumn){
        if(gaTermasuk(without, i) == true){
          e = ambilKata(col, "_", "all", [0]);
          body += `<th>${e}</th>`;
          test += `<th>${e}</th>`;
        }
        i++
      }
      body += looping(1, '', additional, 'th', false);
      test += looping(1, '', additional, 'th', false);
      body += `</tr></thead><tfoot><tr>${test}</tr></tfoot><tbody>`;
      if (mix) body += `${tbody(dataMix, without, additional)}`;
      body += `</tbody></table></div></div></div>`;
      
      return body
  }

  // Untuk meng-generate / menghasil kan table body
  function tbody(data, without, additional) {
    let result = ``;
    let objProperti = Object.keys(data[0].dataValues);
    for (let e in data) {
      let i = 0;
      let j = 0;

      for (let test in data[e].dataValues) {
        if (termasuk(without, j) === true) {
          if (j == 0) result += `<tr`;
          result += ` ${ambilKata(test, "_", "all", [0])}="${
            data[e].dataValues[test]
          }" `;
          if (j == objProperti.length - 1) result += `>`;
        }

        j++;
      }

      // Lopping additional
      result += looping(0, "", additional, "td", null);
      for (let f in data[e].dataValues) {
        if (gaTermasuk(without, i) === true) {
          let classElement = f.split("_")[1];
          result += `<td class = 'table${ubahHurufPertama(classElement)}'>${
            data[e].dataValues[f]
          }</td>`;
        }
        i++;
      }
      // Buat Additional
      result += looping(1, "", additional, "td", true);
      result += `</tr>`;
    }
    // Return
    return result;
  }

  // Fungsi yang mengembalikan true jika argument 'value' tidak sama dengan semua
  // element dalam argument 'dont'
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

  // Jadikan huruf pertama dari suatu kata menjadi besar
  function ubahHurufPertama(word) {
    // Ambil Bagian nomor depan
    let potongan = word.slice(0, 1);
    // Ubah Jadi Huruf besar
    potongan = potongan.toUpperCase();

    // Potong dari 0 sampai akhir
    word = word.slice(1);

    // Gabungkan
    potongan += word;

    // Kirim Potongannya
    return potongan;
  }

  // lopping untuk colloum additional
  function looping(index, result, additional, push, elementLain) {
    // Buat Perulangan Untuk additional tetapi sebelum itu buat kondisi dulu
    if (additional[index].length >= 1) {
      additional[index].forEach(function (e, i) {
        // Check Jika nilainya null maka ubah menjadi string kosong
        e = e === null ? "" : e;
        let word = "";
        // Jika push ada nilainya
        if (elementLain == true && e == "Action")
          word = `<td class="text-center actionTable"><button class="btn btn-primary btn-sm btn-circle edit disableButton" title="Modify related users" aria-describe="Modify related users"><i class="fas fa-edit"></i></button><button class="btn btn-danger btn-sm btn-circle delete disableButton" title="Remove related users"
        aria-describe="Remove related users"><i class="fas fa-trash"></i></button></td>`;
        else
          word =
            push == null
              ? `${ubahHurufPertama(e)}`
              : `<${push}>${ubahHurufPertama(e)}</${push}>`;
        // Jika result == string
        if (typeof result == "string") result += word;
        else result.push(word);
      });
    }
    return result;
  }

  // Check Apakah i termasuk kedalam salah satu withValue
  function termasuk(withValue, i) {
    for (let j in withValue) {
      if (withValue[j] === i) return true;
    }
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
        if (word2.length > 1) {
          if (gaTermasuk(without, i) == true) result += `${e} `;
        } else result += `${e} `;
      }
    });

    result = result.trim();

    return result;
  }

  // Return
  // Main
  return bodyHtml("table");
};
