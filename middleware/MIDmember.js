const renderWeb = require("./MIDBodyWeb");
const db = require("../model/modelIndex");
const url = require("url");

module.exports = async function (req, res) {
  try {
    let test = url.parse(req.url, true).query;
    let { tabelMember, tabelClass } = await db();
    let result = { data: await tabelMember.findAll({include: tabelClass}) };

    // Argument Untuk Render web
    let arg = {
      category: await tabelClass.findAll({raw: true}),
      without: [0, 5,6],
      coloumn: await tabelMember.rawAttributes,
      additional: [[null], [ "Action"]],
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
      identitas : [
        {i: 2, as: 'identifier'},
        {i: 8, as: 'group'}
      ]
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
