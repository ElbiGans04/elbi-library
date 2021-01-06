const renderWeb = require("./MIDBodyWeb");
const db = require("../model/modelIndex");
const url = require("url");

module.exports = async function (req, res) {
  try {
    let test = url.parse(req.url, true).query;
    let { tabelBook, tabelCategory } = await db();
    let result = { data: await tabelBook.findAll({include: tabelCategory})};

    // Argument Untuk Membuat body
    let arg = {
      category: await tabelCategory.findAll({raw: true}),
      without: [0,2, 6, 7, 8, 9, 10],
      coloumnAttr: [0, 6, 7, 8, 9, 10],
      coloumn: await tabelBook.rawAttributes,
      additional: [[null], ["Action"]],
      mix: { yes: true, data: result.data },
      elementName: {
        heading: "List of books",
        buttonName1: {
          icon: "fas fa-clipboard",
          name: "Category",
        },
        buttonName2: {
          icon: "fas fa-book",
          name: "Add Book",
        },
        buttonName3: {
          icon: "fas fa-trash",
          name: "Delete By",
        },
      },identitas : [
        {i: 1, as: 'image'},
        {i: 3, as: 'identifier'},
        {i: 11, as: 'group'},
        {i: 12, as: 'group'},
      ]
    };
    let hasilRender = renderWeb(arg);

    if (test.as == "html") res.json({html: hasilRender});
    else if (test.as == 'dataonly') res.json(result.data)
    else {
      res.render("index", {
        title: "Elbi Library | Book",
        active: "book",
        body: hasilRender,
        css: [`/assets/css/style-global.css`],
        js: [
          "/assets/vendor/datatables/jquery.dataTables.min.js",
          "/assets/vendor/datatables/dataTables.bootstrap4.min.js"
        ],
      });
    }
  } catch (err) {
    console.log(err);
  }
};
