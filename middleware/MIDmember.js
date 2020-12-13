const renderWeb = require("./MIDBodyWeb");
const db = require('../model/modelIndex');
module.exports = async function(req, res) {
    try {
        let {tabelUser} = await db();
        let user = await tabelUser.findOne({raw: true});
        res.render('index', {title: 'Elbi Library | Member', active: 'member' ,body: renderWeb(user, [0, 6, 7], [["no"], ["Action"]]) , css : [`/assets/css/style-global.css`], js:  [
            "/assets/vendor/datatables/jquery.dataTables.min.js",
            "/assets/vendor/datatables/dataTables.bootstrap4.min.js",
            `/assets/js/PUBmember.js`,
        ]});
    } catch(err) {
        console.log(err)
    }
}