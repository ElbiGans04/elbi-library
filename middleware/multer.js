const path = require("path");
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../uploads/img"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      'elbiLibrary-' + file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
module.exports = {
  multer : multer,
  diskStorage,
  fileSize: 1000000
}
