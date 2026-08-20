const {Utilisateur,Action, NormeFormulesPoudre } = require('../models');


// GET normes
exports.getNormesPoudre = async (req,res) => {
  try {
    const normes = await NormeFormulesPoudre.findAll({
        order: [['updatedAt', 'DESC']],
        attributes:['id','data','updatedAt'],
        include:[
                {
                  model:Utilisateur,
                    attributes:['id','fName','lName','pseudo','tel','isAdmin']
                }
              ],
        limit:1
    });
    const latest = normes.length ? normes[0] : {};
    return res.status(200).json({ code: 'green', data: latest });
  } catch (err) {
    return res.status(500).json({ code: 'red', data: {}, message:'❌ Any normes found '+err.message });
  }
};

// PUT normes
exports.updateNormesPoudre = async (req, res) => {
  const {data,UtilisateurId}=req.body;
  const datt=new Date();
  try {
    const normes = await NormeFormulesPoudre.findAll({
      order: [['updatedAt', 'DESC']],
      limit:5
  });
  if(normes.length && 5>normes.length){
    await NormeFormulesPoudre.create({
      data: data,
      UtilisateurId:UtilisateurId
    });
    const addedNormes = await NormeFormulesPoudre.findAll({
        order: [['updatedAt', 'DESC']],
        attributes:['id','data','updatedAt'],
        include:[
            {
              model:Utilisateur,
              attributes:['id','fName','lName','pseudo','tel','isAdmin']
            }
        ],
        limit:1
    });
    return res.status(201).json({ code: 'green', data: addedNormes[0], message: '✅ Normes added' });
  }else{
    if(normes.length && normes[4]){
      const toUpdateId=normes[4].id;
      await NormeFormulesPoudre.update(
        {
          data: data,
          UtilisateurId:UtilisateurId
        },
        { where: { id: toUpdateId } }
      )
      .then(function(){
        Action.create({
          action:"a mis à jour les normes des formules de poudre",
          UtilisateurId:UtilisateurId
        })    
      });
      const updatedNormes = await NormeFormulesPoudre.findAll({
        order: [['updatedAt', 'DESC']],
        attributes:['id','data','updatedAt'],
        include:[
            {
              model:Utilisateur,
              attributes:['id','fName','lName','pseudo','tel','isAdmin']
            }
        ],
        limit:1
    });
      return res.status(200).json({
        code: 'green',
        data:  updatedNormes[0],
        message: '✅ Normes updated'
      });
    }else{
      return res.status(500).json({ code: 'red', data: {}, message: '❌ Once not found'});
    }
  }
} catch (err) {
  return res.status(500).json({ code: 'red', data: {}, message: '❌ Update fail ' + err.message });
}
};
