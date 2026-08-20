const {Utilisateur,Action, Norme } = require('../models');

// Create New Raw Of Normes
// exports.addNormes = async (req, res) => {
//   try {
//     const newNorme = await Norme.create({ data: req.body });
//     return res.status(200).json({
//       code: 'green',
//       data: newNorme,
//       message: '✅ Normes enregistrées'
//     });
//   } catch (error) {
//     return res.status(500).json({
//       code: 'red',
//       data: {},
//       message: '❌ Erreur : ' + error.message
//     });
//   }
// };

// GET normes
exports.getNormes = async (req,res) => {
  try {
    const normes = await Norme.findAll({
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
exports.updateNormes = async (req, res) => {
  const {data,UtilisateurId}=req.body;
  try {
    const normes = await Norme.findAll({
      order: [['updatedAt', 'DESC']],
      limit:5
  });
  if(normes.length && 5>normes.length){
    const created = await Norme.create({
      data: data,
      UtilisateurId:UtilisateurId
    });
    return res.status(201).json({ code: 'green', data: created, message: '✅ Normes added' });
  }else{
    if(normes.length && normes[4]){
      const toUpdateId=normes[4].id;
      const updatedNorme = await Norme.update(
        {
          data: data,
          UtilisateurId:UtilisateurId
        },
        { where: { id: toUpdateId } }
      )
      .then(function(){
        Action.create({
          action:"a mis à jour des normes des liquides",
          UtilisateurId:UtilisateurId
        })    
      });
      return res.status(200).json({
        code: 'green',
        data:  updatedNorme,
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
// const lastNorme = await Norme.findOne({
//   order: [['createdAt', 'DESC']]
// });
// const latest = normes.length ? normes[4] : {};
// const norme = await Norme.findAll({ 
//   order: [['updatedAt', 'ASC']],
//   limit:1
// });
// var normeByPK = await Norme.findByPk(toUpdateId);
// normeByPK.data = data;
// normeByPK.UtilisateurId=UtilisateurId;
// await normeByPK.save();
