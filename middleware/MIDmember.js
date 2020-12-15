const renderWeb = require("./MIDBodyWeb");
const db = require('../model/modelIndex');
module.exports = async function(req, res) {
    try {
        let {tabelUser} = await db();
        let coloumn = await tabelUser.rawAttributes;
        let result = {data: await tabelUser.findAll({})};
        let arg = {
            without: [0, 6, 7],
            coloumn : coloumn,
            additional :  [[null], ["Action"]],
            mix : {yes: true, data: result.data}
        };

        res.render('index', {title: 'Elbi Library | Member', active: 'member' ,body: renderWeb(arg) , css : [`/assets/css/style-global.css`], js:  [
            "/assets/vendor/datatables/jquery.dataTables.min.js",
            "/assets/vendor/datatables/dataTables.bootstrap4.min.js",
            `/assets/js/PUBmember.js`,
        ]});
    } catch(err) {
        console.log(err)
    }
}