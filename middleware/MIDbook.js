const renderWeb = require("./MIDBodyWeb");
const db = require('../model/modelIndex');
module.exports = async function(req, res) {
    try {
        let {tabelBook} = await db();
        let user = await tabelBook.findOne({raw: true});
        // console.log(renderWeb(user, [0,5, 6, 7, 8, 9], [[null], ["Action"]]))
        res.render('index', {title: 'Elbi Library | Book', active: 'book' ,body: renderWeb(user, [0,5, 6, 7, 8, 9], [[null], ["Action"]]) , css: [`/assets/css/style-global.css`, "/assets/css/style-book.css"] , js: [
            "/assets/vendor/datatables/jquery.dataTables.min.js",
            "/assets/vendor/datatables/dataTables.bootstrap4.min.js",
            `/assets/js/PUBbook.js`,
          ]})
    } catch (err) {
        console.log(err)
    }
}