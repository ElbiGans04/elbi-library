const tabel = require("../model/modelIndex");
const url = require('url');

let obj = {};
obj.post = async (req, res) => {
  try {
    const { tabelClass, Op, tabelMember } = await tabel();
    
    let classM = await tabelClass.findAll({
      where: {
        class: {
          [Op.substring]: req.body.class_id.slice(5),
        },
      },
      raw: true,
    });
  
    req.body.class_id = classM[0].id;
  
  
    await tabelMember.create(req.body);
    res.status(201).send("Success");
  } catch (err) {
    res.statusCode(500).send(err)
  }
};

obj.put = async function(req,res){
  try {
    const { tabelClass, Op, tabelMember } = await tabel();

    // Check apakah ada user dengan id tsb
    let u = await tabelMember.findAll({where: {id: req.body.id}})
    if(u.length <= 0) return res.sendStatus(404);

    
    let classM = await tabelClass.findAll({
      where: {
        class: {
          [Op.substring]: req.body.class_id.slice(5),
        },
      },
      raw: true,
    });

    req.body.class_id = classM[0].id
  
    await tabelMember.update(req.body, {where: {id: req.body.id}});
    res.status(201).send("Success")

  } catch (err) {
    res.statusCode(500).send(err)
  }

};

obj.delete = async function(req, res) {
  let link = url.parse(req.url, true).query;
  const { tabelClass, Op, tabelMember } = await tabel();

  // Validation
  let u = await tabelMember.findAll({where: {id: link.i}})
  if(u.length <= 0) return res.sendStatus(404);

  // Lakukan 
  await tabelMember.destroy({where: {
    id: link.i
  }});

  res.sendStatus(200)
}


// Export
module.exports = obj
