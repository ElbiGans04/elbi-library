const renderWeb = require("./MIDBodyWeb");
const db = require("../model/modelIndex");
const url = require("url");

module.exports = async function (req, res) {
  try {
    let test = url.parse(req.url, true).query;
    let { tabelBook } = await db();
    let result = { data: await tabelBook.findAll({})};
    let coloumn = await tabelBook.rawAttributes;
    let arg = {
      without: [0, 1, 5, 6, 7, 8, 9],
      coloumn: coloumn,
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
      },
    };
    let hasilRender = renderWeb(arg);

    if (test.as == "string") res.json({html: hasilRender, data: result });
    else {
      res.render("index", {
        title: "Elbi Library | Book",
        active: "book",
        body: hasilRender,
        css: [`/assets/css/style-global.css`, "/assets/css/style-book.css"],
        js: [
          "/assets/vendor/datatables/jquery.dataTables.min.js",
          "/assets/vendor/datatables/dataTables.bootstrap4.min.js",
          `/assets/js/PUBbook.js`,
        ],
      });
    }
  } catch (err) {
    console.log(err);
  }
};
