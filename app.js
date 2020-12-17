(async function () {
  let express = require("express");
  let app = express();
  let path = require("path");
  const router = require("./router/router");
  let db = require("./model/modelIndex");
  let { sequelize, tabelBook, tabelUser } = db();

  // Perbaharui semua tabel (Menghapus semua tabel)
  await sequelize.sync({force: true})

  // Demo Untuk Tabel User isi Data demo untuk sementara saat pengembangan
  let demo = [
    {
      member_number: "71023",
      member_name: "Adam McKenzie",
      member_class: "12 Rpl 1",
      member_date_of_birth: "74255",
      member_adress: "000 Kling Station",
    },
    {
      member_number: "97995",
      member_name: "Rashad Mraz",
      member_class: "12 Rpl 2",
      member_date_of_birth: "86146",
      member_adress: "403 Dora Haven",
    },
    {
      member_number: "174267",
      member_name: "Coty Schultz",
      member_class: "12 Rpl 3",
      member_date_of_birth: "50009",
      member_adress: "Greenholt Ranch",
    },
  ];
  await tabelUser.bulkCreate(demo);
  await tabelBook.create({book_image: '122333' ,book_title: 'Grow With Character', book_launching: '29112013', book_author: 'Hermawan Kartajaya', book_publisher: 'PT. Gramedia Pustaka Utama', book_page_thickness: `488`, book_isbn: '9789792257359'});
  await tabelBook.create({book_image: '74000' ,book_title: 'Product Program Liaison', book_launching: '21041', book_author: 'Dr. Jalon Hoppe', book_publisher: 'PT. Gramedia Pustaka Utama', book_page_thickness: `488`, book_isbn: '9789792257359'});



  app.set("views", path.join(__dirname, "./views"));
  app.set("view engine", "pug");
  app.use("/assets", express.static(__dirname + "/public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  router(app);
})();
