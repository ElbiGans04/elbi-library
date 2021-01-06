const dotenv = require("dotenv").config({
  path: __dirname + "/../config/.env",
});
const port = process.env.APP_PORT;
const member = require("../middleware/MIDmember");
const book = require("../middleware/MIDbook");
const {multer, fileSize, diskStorage} = require('../middleware/multer');
const memberPost = require('../middleware/MIDmemberAll');
const bookData = require('../middleware/MIDbookAll');


module.exports = async function (app) {
  
  // app.get("/", index);
  
  app.use(multer({storage : diskStorage, limits: {fileSize: fileSize}}).single('gambar'))
  app.get("/member", member);
  app.post("/member", await memberPost.post);
  app.put('/member', await memberPost.put);
  
  app.get("/book", book);
  app.post("/book", await bookData.post);
  app.put("/book", await bookData.put);



  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server telah berjalan dengan port ${port}`);
  });
};
