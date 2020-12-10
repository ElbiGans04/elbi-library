let fs = require('fs')
module.exports = function(req, res) {
    fs.readFile(__dirname + '/../views/data-demo.json', {encoding: 'utf-8'}, function(err, data){
        if(err) throw err;
        res.send(data)
    })
}