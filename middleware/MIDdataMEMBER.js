let db = require('../model/modelIndex');
const renderWeb = require("./MIDBodyWeb");
module.exports = async function(req, res) {
    let { tabelUser } = db();
    let result = {data: await tabelUser.findAll({})};
    let coloum = await tabelUser.rawAttributes;
    let arg = {
        without: [0, 6, 7],
        coloumn : coloum,
        additional :  [[null], ["Action"]],
        mix : {yes: true, data: result.data}
    };
    result.html = renderWeb(arg);
    return res.json(result)
}