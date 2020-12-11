const path = require('path');
const dotenv = require('dotenv').config({path: path.resolve(__dirname, '../config/.env')});
const {Sequelize, DataTypes} = require('sequelize');
module.exports = async function() {

    // Setup Sequelize
    const sequelize = new Sequelize(process.env.APP_DATABASE, process.env.APP_USER, null, {
        dialect: process.env.APP_DIALECT,
        host: process.env.APP_HOST
    });

    // Setup tabel user dan tabel book
    let tabelUser = require('./modelUser')(sequelize, DataTypes);
    let tabelBook = require('./modelBook')(sequelize, DataTypes);

    return {sequelize, tabelUser, tabelBook}

}