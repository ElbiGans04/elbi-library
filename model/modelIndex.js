const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../config/.env"),
});
const { Sequelize, DataTypes, Op } = require("sequelize");
module.exports = async function () {
  // Setup Sequelize
  const sequelize = new Sequelize(
    process.env.APP_DATABASE,
    process.env.APP_USER,
    null,
    {
      dialect: process.env.APP_DIALECT,
      host: process.env.APP_HOST,
      logging: false,
    }
  );

  // Setup tabel user dan tabel book
  let tabelMember = require("./modelMember")(sequelize, DataTypes);
  let tabelBook = require("./modelBook")(sequelize, DataTypes);
  let tabelClass = require("./modelClass")(sequelize, DataTypes);
  const tabelCategory = require("./modelCategory")(sequelize, DataTypes);

  await tabelClass.hasMany(tabelMember, { foreignKey: "class_id" });
  await tabelMember.belongsTo(tabelClass, { foreignKey: "class_id" });
  await tabelCategory.hasMany(tabelBook, { foreignKey: "category_id" });
  await tabelBook.belongsTo(tabelCategory, { foreignKey: "category_id" });

  return { sequelize, tabelMember, tabelBook, tabelClass, tabelCategory, Op };
};
