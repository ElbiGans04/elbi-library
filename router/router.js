const dotenv = require("dotenv").config({
  path: __dirname + "/../config/.env",
});
const port = process.env.APP_PORT;
const member = require("../middleware/MIDmember");
const index = require("../middleware/MIDindex");
const book = require("../middleware/MIDbook");
const data = require("../middleware/MIDdata");


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
