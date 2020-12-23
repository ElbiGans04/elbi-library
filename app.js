(async function () {
  let express = require("express");
  let app = express();
  let path = require("path");
  const router = require("./router/router");
  let db  = require("./model/modelIndex");
  


  app.set("views", path.join(__dirname, "./views"));
  app.set("view engine", "pug");
  app.use("/assets", express.static(__dirname + "/public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  router(app);
})();
