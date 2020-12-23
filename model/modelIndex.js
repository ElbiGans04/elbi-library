const path = require('path');
const dotenv = require('dotenv').config({path: path.resolve(__dirname, '../config/.env')});
const {Sequelize, DataTypes} = require('sequelize');
module.exports = async function() {
    // Setup Sequelize
    const sequelize = new Sequelize(process.env.APP_DATABASE, process.env.APP_USER, null, {
        dialect: process.env.APP_DIALECT,
        host: process.env.APP_HOST,
        logging: false
    });

    // Setup tabel user dan tabel book
    let tabelMember = require('./modelMember')(sequelize, DataTypes);
    let tabelBook = require('./modelBook')(sequelize, DataTypes);
    let tabelClass = require('./modelClass')(sequelize, DataTypes);
    const tabelCategory = require('./modelCategory')(sequelize, DataTypes);

  // Demo Untuk Tabel User isi Data demo untuk sementara saat pengembangan
  let demo = [
    [
      {
        member_number: "71023",
        member_name: "Adam McKenzie",
        member_date_of_birth: "74255",
        member_adress: "000 Kling Station",
        class_id : '1'
      },
      {
        member_number: "97995",
        member_name: "Rashad Mraz",
        member_date_of_birth: "86146",
        member_adress: "403 Dora Haven",
        class_id : '2'
      },
      {
        member_number: "174267",
        member_name: "Coty Schultz",
        member_date_of_birth: "50009",
        member_adress: "Greenholt Ranch",
        class_id: '3'
      },
    ],
    [
      {
        book_image: "122333",
        book_title: "Grow With Character",
        book_launching: "29112013",
        book_author: "Hermawan Kartajaya",
        book_publisher: "PT. Gramedia Pustaka Utama",
        book_page_thickness: `488`,
        book_isbn: "9789792257359",
        category_id : '1'
      },
      {
        book_image: "74000",
        book_title: "Product Program Liaison",
        book_launching: "21041",
        book_author: "Dr. Jalon Hoppe",
        book_publisher: "PT. Gramedia Pustaka Utama",
        book_page_thickness: `488`,
        book_isbn: "9",
        category_id : '2'
      },
    ], [
      {class: '12 Rpl 1'},
      {class: '12 Rpl 2'},
      {class: '12 Rpl 3'}
    ],
    [
        {category: 'nature'},
        {category: 'fantasy'},
        {category: 'history'}
    ]
  ];
  await tabelClass.hasMany(tabelMember, {foreignKey: 'class_id'});
  await tabelMember.belongsTo(tabelClass, {foreignKey: 'class_id'});
  await tabelCategory.hasMany(tabelBook, {foreignKey: 'category_id'});
  await tabelBook.belongsTo(tabelCategory, {foreignKey: 'category_id'});

  await sequelize.sync({force: true})

  
  let classT = await tabelClass.bulkCreate(demo[2]);
  let cat = await tabelCategory.bulkCreate(demo[3]);
  let user2 = await tabelMember.bulkCreate(demo[0]);
  await tabelBook.bulkCreate(demo[1]);
  



    return {sequelize, tabelMember, tabelBook, tabelClass, tabelCategory}

}