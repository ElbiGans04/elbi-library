let db = require('../model/modelIndex');
const renderWeb = require("./MIDBodyWeb");
module.exports = async function(req, res) {
    let { tabelBook } = db();
    let result = {data: await tabelBook.findAll({})};
    let coloumn = await tabelBook.rawAttributes;
    console.log(coloumn)
    let arg = {
        without: [0,1 ,5, 6, 7, 8, 9],
        coloumn : coloumn,
        additional :  [[null], ["Action"]],
        mix : {yes: true, data: result.data}
    };

    result.html = renderWeb(arg);
    return res.json(result)
}