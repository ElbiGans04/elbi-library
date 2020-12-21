const renderWeb = require("./MIDBodyWeb");
const db = require("../model/modelIndex");
const url = require("url");

module.exports = async function (req, res) {
  try {
    let test = url.parse(req.url, true).query;
    let { tabelUser, tabelCategory } = await db();
    let result = { data: await tabelUser.findAll({}) };

    // Argument Untuk Render web
    let arg = {
      type: "member",
      without: [0, 6, 7],
      coloumn: await tabelUser.rawAttributes,
      additional: [[null], ["Action"]],
      mix: { yes: true, data: result.data },
      elementName: {
        heading: "List of Library Members",
        buttonName1: {
          icon: "fas fa-users",
          name: "Class",
        },
        buttonName2: {
          icon: "fas fa-user",
          name: "Add Member",
        },
        buttonName3: {
          icon: "fas fa-trash",
          name: "Delete By",
        },
      },
    };
    let hasilRender = renderWeb(arg);

    if (test.as == "html") res.json({ html: hasilRender, data: result });
    else if (test.as == 'dataonly') res.json(result.data);
    else {
      res.render("index", {
        title: "Elbi Library | Member",
        active: "member",
        body: hasilRender,
        css: [`/assets/css/style-global.css`],
        js: [
          "/assets/vendor/datatables/jquery.dataTables.min.js",
          "/assets/vendor/datatables/dataTables.bootstrap4.min.js",
        ],
      });
    }
  } catch (err) {
    console.log(err);
  }
};
