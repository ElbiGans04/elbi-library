const renderWeb = require("../middleware/renderWeb");
module.exports = function(req, res) {
    res.render('index', {title: 'Elbi Library | Book', active: 'book' ,component: renderWeb('book')})
}