module.exports = function (data) {
  let {without, coloumn, additional, elementName} = data;
  let {heading, buttonName1, buttonName2, buttonName3} = elementName;


  let mix = data.mix.yes;
  let dataMix = data.mix.data;

  // Kumpulan Fungsi
  function generateNameColoumns(result, coloumn, without, additional) {
    let i = 0;

    // Buat Perulangan Untuk additional tetapi sebelum itu buat kondisi dulu
    looping(0, result, additional, null);

    // Buat Perulangan pada coloum inti
    for (let e in coloumn) {
      // Check apakah Index saat ini itu termasuk kedalam index yang dilarang. Jika tidak termasuk maka lanjutkan
      if (gaTermasuk(without, i) == true) {
        // Pisahkan kata
        let e2 = e.split("_");

        // Jika saat dibagi panjang e2 lebih dari 1 maka lanjutkan
        if (e2.length > 1) {
          let result2 = "";

          // Panjang tanpa kata pertama seperti : 'member' dll
          let j = e2.length - 1;

          e2.forEach(function (e, i) {
            // Saat bukan index pertama lakukan operasi concat. Supaya 'member' dalam kasus ini
            // Tidak Masuk
            if (i > 0) result2 += e;

            // Tambahkan Underscrore saat 'i' sama dengan atau lebi dari 1 & saat 'i' tidak sama dengan 'j'
            if (i >= 1 && i !== j) result2 += "_";
          });

          // Masukan ke array result
          result.push(potongKata(result2));
        }
      }

      i++;
    }
    // Perulangan dari belakang
    looping(1, result, additional, null);

    // Return
    return result;
  }

  // Fungsi yang mengembalikan true jika argument 'value' tidak sama dengan semua
  // element dalam argument 'dont'
  function gaTermasuk(dont, value) {
    let i = 0;
    for (let a of dont) {
      // Jika Value sama dengan element didalam dont maka return false
      if (a === value) return false;
      // return true saat 'i' == dont length. Mengapa saya tidak mengecheck nilai yang sama lagi ? Kerena telah dicheck oleh 'if'  diatas
      if (i === dont.length - 1) return true;
      i++;
    }
  }

  // Pisahkan kalimat
  function potongKata(word) {
    // Pisahkan kalimat
    let hasilPotongan = word.split("_");
    let result = "";
    let i = 0;
    hasilPotongan.forEach(function (e) {
      // Ubah Huruf Pertama menjadi huruf besar
      result += ubahHurufPertama(e);
      // Jangan Tambahkan spasi jika itu kalimat terakhir
      if (i < hasilPotongan.length - 1) result += " ";
      i++;
    });

    return result;
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
  function looping(index, result, additional , push) {
    // Buat Perulangan Untuk additional tetapi sebelum itu buat kondisi dulu
    if (additional[index].length >= 1) {
      additional[index].forEach(function (e, i) {
        // Check Jika nilainya null maka ubah menjadi string kosong
        e = e === null ? '' : e;
        // Jika push ada nilainya
        let word = push == null ? `${ubahHurufPertama(e)}` : `<${push}>${ubahHurufPertama(e)}</${push}>`;
        // Jika result == string
        if(typeof result == 'string') result += word
        else result.push(word);
      });
    }
    return result
  }


  function bodyHtml(type, coloumn) {
    if (type == "table") {
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
              <select class="custom-select custom-select-sm form-control form-control-sm ml-3" id="inputClass" name="deleteByClass" aria-controls="dataTable">
                <option value="all">All</option>
                <option value="12 Rpl 1">12 Rpl 1</option>
                <option value="12 Rpl 2">12 Rpl 2</option>
                <option value="12 Rpl 3">12 Rpl 3         </option>
              </select>
                
              </div>
              <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered display" id="tabelUtama" width="100%" cellspacing="0">
                  <thead>
                    <tr>`;
      coloumn.forEach(function (e, i) {
        body += `<th>${e}</th>`;
        test += `<th>${e}</th>`

        // Jika sudah forEach semua coloumn
        if (i == coloumn.length - 1) {
          body += `</tr></thead><tfoot><tr>${test}</tr></tfoot><tbody>`;
          if(mix) body += `${tbody(dataMix, without, additional)}`;
          body += `</tbody></table></div></div></div>`
        }
      });
      return body;
    }
  }

  // Untuk meng-generate / menghasil kan tbody
  function tbody (data, without, additional) {
    let result = ``;
    for(let e in data) {
      let i = 0;
      result += looping(0, '<tr>', additional, 'td');
      for(let f in data[e].dataValues) {
          if(gaTermasuk(without, i) === true) result += `<td>${potongKata(data[e].dataValues[f])}</td>`;
          i++
      }
        // Buat Additional
      result += looping(1, '', additional, 'td');
      result += `</tr>`;
        
    }  
      // Return
      return result
  };


  // Return
  // Main
  let result = generateNameColoumns([], coloumn, without, additional);
  return bodyHtml("table", result);
};
