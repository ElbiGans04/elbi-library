const dotenv = require("dotenv").config({
  path: __dirname + "/../config/.env",
});
const port = process.env.APP_PORT;
const member = require("../middleware/member");
const index = require("../middleware/index");
const book = require("../middleware/book");
const data = require("../middleware/data");


module.exports = function (app) {
  app.get("/", index);
  app.get("/member", member);
  app.get("/book", book);
  app.post("/data", data);


  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server telah berjalan dengan port ${port}`);
  });
};
