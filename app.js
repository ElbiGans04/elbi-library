let express = require('express');
let app = express();
let path = require('path');
const router = require('./router/router');
// const dotenv = require('dotenv').config({path: './config/.env'});


app.set('views' , path.join(__dirname, './views'));
app.set('view engine', 'pug');
app.use('/assets',express.static(__dirname + '/public'));


router(app);