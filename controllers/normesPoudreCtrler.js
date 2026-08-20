const {Utilisateur,Action, NormePoudre,NormeFormulesPoudre } = require('../models');

// GET normes Lansas & Formules
exports.getNormes = async (req,res) => {
  try {
    const lansas = await NormePoudre.findAll({
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
    const formules = await NormeFormulesPoudre.findAll({
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
    const Lansas = lansas.length ? lansas[0] : {};
    const Formules = formules.length ? formules[0] : {};
    return res.status(200).json({ code: 'green', data: {lansas:Lansas,formules:Formules} });
  } catch (err) {
    return res.status(500).json({ code: 'red', data: {}, message:'❌ Any normes found | error-> '+err.message });
  }
};
// GET normes Lansas
exports.getNormesPoudre = async (req,res) => {
  try {
    const normes = await NormePoudre.findAll({
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
    const normes = await NormePoudre.findAll({
      order: [['updatedAt', 'DESC']],
      limit:5
  });
  if(normes.length && 5>normes.length){
    const created = await NormePoudre.create({
      data: data,
      UtilisateurId:UtilisateurId
    });
    return res.status(201).json({ code: 'green', data: created, message: '✅ Normes added' });
  }else{
    if(normes.length && normes[4]){
      const toUpdateId=normes[4].id;
      const updatedNorme = await NormePoudre.update(
        {
          data: data,
          UtilisateurId:UtilisateurId
        },
        { where: { id: toUpdateId } }
      )
    .then(function(){
      Action.create({
        action:"a mis à jour les normes des lansas.",
        UtilisateurId:UtilisateurId
      })    
    });
      const updatedNormes = await NormePoudre.findAll({
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
  return res.status(500).json({ code: 'red', data: {}, message: '❌ Update fail '+err.message });
}
};
