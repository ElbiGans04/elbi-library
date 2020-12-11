const renderWeb = require("../middleware/renderWeb");
module.exports = function(req, res) {
    res.render('index', {title: 'Elbi Library | Member', active: 'member' ,component: renderWeb('member')})
}