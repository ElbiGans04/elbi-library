(async function () {
  let express = require("express");
  let app = express();
  let path = require("path");
  const router = require("./router/router");
  let db = require("./model/modelIndex");
  let { tabelBook, tabelUser } = await db();

  // Hapus semua tabel
  // Demo Untuk Tabel User
  // Isi Data demo
  let demo = [
    {
      member_number: "71023",
      member_name: "Adam McKenzie",
      member_class: "12 Rpl 1",
      member_dateOfBirth: "74255",
      member_adress: "000 Kling Station",
    },
    {
      member_number: "97995",
      member_name: "Rashad Mraz",
      member_class: "12 Rpl 2",
      member_dateOfBirth: "86146",
      member_adress: "403 Dora Haven",
    },
    {
      member_number: "174267",
      member_name: "Coty Schultz",
      member_class: "12 Rpl 3",
      member_dateOfBirth: "50009",
      member_adress: "Greenholt Ranch",
    },
  ];
  await tabelUser.bulkCreate(demo);
  await tabelBook.create({book_judul: 'Grow With Character', book_peluncuran: '29112013', book_pengarang: 'Hermawan Kartajaya', book_penerbit: 'PT. Gramedia Pustaka Utama', book_tebalHalaman: `488`, book_isbn: '9789792257359'})

  app.set("views", path.join(__dirname, "./views"));
  app.set("view engine", "pug");
  app.use("/assets", express.static(__dirname + "/public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  router(app);
})();
