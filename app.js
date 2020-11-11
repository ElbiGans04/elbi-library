let express = require('express');
let app = express();
let pug = require('pug');
let path = require('path');

app.set('views' , path.join(__dirname, './views'));
app.set('view engine', 'pug');
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));
app.get('/' , function(req, res){
    res.render('member')
});

app.listen(3000, err => {
    if(err) throw err;
    console.log("Berhasil Terhubung")
})