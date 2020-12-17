const renderWeb = require("./MIDBodyWeb");
const db = require('../model/modelIndex');
const url = require('url');

module.exports = async function(req, res) {
    try {
        let test = url.parse(req.url, true).query;
        let {tabelUser} = await db();
        let coloumn = await tabelUser.rawAttributes;
        let result = {data: await tabelUser.findAll({})};
        let arg = {
            without: [0, 6, 7],
            coloumn : coloumn,
            additional :  [[null], ["Action"]],
            mix : {yes: true, data: result.data},
            elementName: {
                heading: 'List of Library Members',
                buttonName1 : {
                    icon : 'fas fa-users',
                    name: 'Class'
                },
                buttonName2 : {
                    icon : 'fas fa-user',
                    name: 'Add Member'
                },
                buttonName3 : {
                    icon : 'fas fa-trash',
                    name : 'Delete By'
                }
            }
        };
        let hasilRender = renderWeb(arg);

        if(test.as == 'string') res.json({html : hasilRender, data: result})
        else {
            res.render('index', {title: 'Elbi Library | Member', active: 'member' ,body: hasilRender , css : [`/assets/css/style-global.css`], js:  [
                "/assets/vendor/datatables/jquery.dataTables.min.js",
                "/assets/vendor/datatables/dataTables.bootstrap4.min.js",
                `/assets/js/PUBmember.js`,
            ]});
        }

    } catch(err) {
        console.log(err)
    }
}