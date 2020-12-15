const renderWeb = require("./MIDBodyWeb");
const db = require('../model/modelIndex');
module.exports = async function(req, res) {
    try {
        let {tabelBook} = await db();
        let result = {data: await tabelBook.findAll({})};
        let coloumn = await tabelBook.rawAttributes;
        let arg = {
            without: [0,5, 6, 7, 8, 9],
            coloumn : coloumn,
            additional :  [[null], ["Action"]],
            mix : {yes: true, data: result.data}
        };
        res.render('index', {title: 'Elbi Library | Book', active: 'book' ,body: renderWeb(arg) , css: [`/assets/css/style-global.css`, "/assets/css/style-book.css"] , js: [
            "/assets/vendor/datatables/jquery.dataTables.min.js",
            "/assets/vendor/datatables/dataTables.bootstrap4.min.js",
            `/assets/js/PUBbook.js`,
          ]})
    } catch (err) {
        console.log(err)
    }
}