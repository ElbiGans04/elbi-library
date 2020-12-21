let method = {};

method.gaTermasuk = function(dont, value) {
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
};

// Jadikan huruf pertama dari suatu kata menjadi besar
method.ubahHurufPertama = function (word) {
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
};

// Check Apakah i termasuk kedalam salah satu withValue
method.termasuk = function (withValue, i) {
  for (let j in withValue) {
    if (withValue[j] === i) return true;
  }
}


method.ambilKata =   function (word, pemisah, ambil, without) {
    let word2 = word.split(pemisah);
    let result = "";
    if(word.length > 0) {
      word2.forEach(function (e, i) {
        e = ubahHurufPertama(e);
        // Jika argument ambil sama dengan number
        if (typeof ambil == "number") {
          if (i == ambil) result += e;
        } else if (typeof ambil == "object") {
          if (method.termasuk(ambil, i) == true) result += `${e} `;
        } else if (typeof ambil == "string") {
          if (method.gaTermasuk(without, i) == true) result += `${e} `;
        }
      });
    }

    result = result.trim();

    // if (result.length > 0) return result;
    // else return result2;

    return result
  }


module.exports = method;