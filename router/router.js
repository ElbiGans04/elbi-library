const dotenv = require("dotenv").config({
  path: __dirname + "/../config/.env",
});
const port = process.env.APP_PORT;
const member = require("../controllers/MIDmember");
const book = require("../controllers/MIDbook");
const {multer, fileSize, diskStorage} = require('../middleware/multer');
const memberPost = require('../controllers/MIDmemberAll');
const bookData = require('../controllers/MIDbookAll');


module.exports = async function (app) {
  
  // app.get("/", index);
  
  app.use(multer({storage : diskStorage, limits: {fileSize: fileSize}}).single('gambar'))
  app.get("/member", member);
  app.post("/member", await memberPost.post);
  app.put('/member', await memberPost.put);
  app.delete('/member', await memberPost.delete);
  
  app.get("/book", book);
  app.post("/book", await bookData.post);
  app.put("/book", await bookData.put);
  app.delete('/book', await bookData.delete);

  // Category 
  app.post('/bookclass' , async function(req, res){
    let tabel = require('../model/modelIndex');
    let {tabelCategory} = await tabel();
    await tabelCategory.create({category: req.body.value});

    res.sendStatus(200)
  });

  app.put('/bookclass', async function(req, res){
    let tabel = require('../model/modelIndex');
    let {tabelCategory} = await tabel();
    await tabelCategory.update({category: req.body.value}, {
      where: {
        id: req.body.old
      }
    })
    res.sendStatus(200)
  });

  app.delete('/bookclass', async function(req, res){
    let tabel = require('../model/modelIndex');
    let {tabelCategory} = await tabel();
    
    await tabelCategory.destroy({where: {
     id : req.body.value
    }})
    res.sendStatus(200)
  });


  app.post('/memberclass', async function(req,res){
    let tabel = require('../model/modelIndex');
    let {tabelClass} = await tabel();
    await tabelClass.create({class: req.body.value});
    
    res.sendStatus(200);
  });

  app.put('/memberclass', async function(req,res){
    let tabel = require('../model/modelIndex');
    let {tabelClass} = await tabel();
    
    await tabelClass.update({class: req.body.value}, {
      where: {
        id: req.body.old
      }
    })
    res.sendStatus(200)
  });

  app.delete('/memberclass', async function(req,res){
    let tabel = require('../model/modelIndex');
    let {tabelClass} = await tabel();
    
    await tabelClass.destroy({where: {
      id: req.body.value
    }})
    res.sendStatus(200)
  });

  app.delete('/memberby', async function(req, res){
    let tabel = require('../model/modelIndex');
    let {tabelMember, Op, tabelClass} = await tabel();
    let value;

    // Jika Nilainya array
    if(req.body.valueArray !== undefined) {
      value = JSON.parse(req.body.valueArray);
      console.log(value)
      await tabelMember.destroy({
        where: {
          id : {
            [Op.in] : value
          }
        }
      })
    } else {
      value = req.body.value
      let classCustom = await tabelClass.findAll({where: {
        class: {
          [Op.substring] : value
        }
      }, raw: true});

     if(classCustom.length <= 0 ) return res.sendStatus(4004)
     await tabelMember.destroy({
       where: {
         class_id: classCustom[0].id
       }
     })
    };

    
    res.sendStatus(200)
  });

  app.delete('/bookby', async function(req, res){
    let tabel = require('../model/modelIndex');
    let {tabelBook, Op, tabelCategory} = await tabel();
    let value;
    if(req.body.valueArray !== undefined) {
      value = JSON.parse(req.body.valueArray)
      await tabelBook.destroy({
        where: {
          id : {
            [Op.in] : value
          }
        }
      })
    } else {
      value = req.body.value
      let categoryCustom = await tabelCategory.findAll({where: {
        category: {
          [Op.substring] : value
        }
      }, raw: true})
     await tabelBook.destroy({
       where: {
         category_id: categoryCustom[0].id
       }
     })
    };

    
    res.sendStatus(200)
  });




  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server telah berjalan dengan port ${port}`);
  });
};
