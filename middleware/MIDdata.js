let db = require('../model/modelIndex');
module.exports = async function(req, res) {
    let { tabelBook } = db();
    let result = {data: await tabelBook.findAll({})}
    res.json(result)
}