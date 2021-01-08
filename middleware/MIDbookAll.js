let obj = {};
const tabel = require("../model/modelIndex");
const fs = require("fs");
const path = require("path");
const url = require('url');

obj.post = async function (req, res) {
  try {
    let { tabelCategory, tabelBook, Op } = await tabel();
    let id = await tabelCategory.findAll({
      where: {
        category: {
          [Op.substring]: req.body.category_id.slice(
            req.body.category_id.length - 2
          ),
        },
      },
    });

    req.body.category_id = id[0].dataValues.id;
    let ext = path.extname(req.file.originalname);
    req.body.book_image_type = ext.split(".")[1];
    req.body.book_image = fs.readFileSync(req.file.path);

    await tabelBook.create(req.body);

    res.status(201).send("Congratulation");
  } catch (err) {
    res.sendStatus(500);
  }
};

obj.put = async function (req, res) {
  try {
    let { tabelCategory, tabelBook, Op } = await tabel();
    if (req.file !== undefined) {
      req.body.book_image = fs.readFileSync(req.file.path, {});
      let ext = path.extname(req.file.originalname);
      req.body.book_image_type = ext.split(".")[1];
    }

    let id = await tabelCategory.findAll({
      where: {
        category: {
          [Op.substring]: req.body.category_id.slice(
            req.body.category_id.length - 2
          ),
        },
      },
    });

    req.body.category_id = id[0].dataValues.id;
    await tabelBook.update(req.body, { where: { id: req.body.id } });
  } catch (err) {
    res.status(500).send(err)
  }
  res.sendStatus(200);
};

obj.delete = async function(req, res) {
  try {
    let link = url.parse(req.url, true).query;
    let {tabelBook} = await tabel();
  
    let u = await tabelBook.findAll({where: {
      id: link.i
    }, raw: true});
  
    if(u.length <= 0 ) return res.sendStatus(404);
    await tabelBook.destroy({where : {
      id: link.i
    }});
  
    
    res.sendStatus(200)
  } catch(err) {
    res.status(500).send(err)
  }
}

module.exports = obj;
