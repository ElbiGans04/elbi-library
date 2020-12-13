let data = {
    id: 1,
    member_number: '71023',
    member_name: 'Adam McKenzie',
    member_class: '12 Rpl 1',
    member_date_Of_Birth: '74255',
    member_adress: '000 Kling Station',
    createdAt: '2020-12-11T11:54:52.000Z',
    updatedAt: '2020-12-11T11:54:52.000Z'
};


let result = [];
generateNameColoumns(data, [0, 6, 7]);

function generateNameColoumns(coloumn, without) {
  let i = 0;
  for(let e in coloumn) {
      // Check apakah Index saat ini itu termasuk kedalam index yang dilarang. Jika tidak termasuk maka lanjutkan
      if (gaTermasuk(without, i) == true) {

        // Pisahkan kata 
        let e2 = e.split('_');

        // Jika saat dibagi panjang e2 lebih dari 1 maka lanjutkan
        if(e2.length > 1) {
            let result2 = '';

            // Panjang tanpa kata pertama seperti : 'member' dll
            let j = e2.length - 1;
 
            e2.forEach(function(e, i){
                // Saat bukan index pertama lakukan operasi concat. Supaya 'member' dalam kasus ini
                // Tidak Masuk
                if(i > 0) result2 += e;

                // Tambahkan Underscrore saat 'i' sama dengan atau lebi dari 1 & saat 'i' tidak sama dengan 'j'
                if(i >= 1 && i !== j) result2 += '_'
            })

            // Masukan ke array result
            result.push(poDer(result2));
        }

      };


      i++
  }
};

function gaTermasuk(dont, value){
    let i = 0;
    for (let a of dont) {
        // Jika Value sama dengan element didalam dont maka return false
        if(a === value) return false
        // return true saat 'i' == dont length. Mengapa saya tidak mengecheck nilai yang sama lagi ? Kerena
        // telah dicheck oleh 'if'  diatas
        if(i ===  (dont.length - 1)) return true
        i++ 
    }
}


function poDer(word) {
    // Pisahkan kalimat
    let hasilPotongan = word.split('_');
    let result = '';
    let i = 0;
    hasilPotongan.forEach(function(e){
        result += poBar(e);
        // Jangan Tambahkan spasi jika itu kalimat terakhir
        if(i < (hasilPotongan.length - 1)) result += ' ';
        i++
    })

    return result
}


function poBar(word) {
    // Ambil Bagian nomor depan
    let potongan = word.slice(0,1);
    // Ubah Jadi Huruf besar 
    potongan = potongan.toUpperCase();

    // Potong dari 0 sampai akhir
    word = word.slice(1);

    // Gabungkan
    potongan += word;
    
    // Kirim Potongannya
    return potongan
};

console.log(result)