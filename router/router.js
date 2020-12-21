const dotenv = require("dotenv").config({
  path: __dirname + "/../config/.env",
});
const port = process.env.APP_PORT;
const member = require("../middleware/MIDmember");
const book = require("../middleware/MIDbook");


module.exports = function (app) {
  // app.get("/", index);
  app.get("/member", member);
  // app.post("/member", memberData);
  
  app.get("/book", book);
  // app.post("/book", bookData);



  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server telah berjalan dengan port ${port}`);
  });
};
