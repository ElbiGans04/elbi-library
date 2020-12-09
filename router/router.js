const dotenv = require("dotenv").config({
  path: __dirname + "/../config/.env",
});
const port = process.env.APP_PORT || 3000;
const member = require("../middleware/member");
const index = require("../middleware/index");
const book = require("../middleware/book");
const fs = require("fs");
const query = require("querystring");

module.exports = function (app) {
  app.get("/", index);
  app.get("/member", member);
  app.get("/book", book);
  app.post("/data", function (req, res) {
    fs.readFile(__dirname + '/../views/data-demo.json', {encoding: 'utf-8'}, function(err, data){
      if(err) throw err;
      res.send(data)
    })
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server telah berjalan dengan port ${port}`);
  });
};
