var models=require('../models');

// var io;
// module.exports.setSocketIoPC = function (socketIoInstance) {
//     io = socketIoInstance;
//   };

module.exports.commentairePoudreCtrler={
    add:function(req,res){
    //params
    var text=req.body.text;
    var UtilisateurId=req.body.UtilisateurId;
    var AnalyseId=req.body.AnalyseId;

    if(text==null || UtilisateurId==null || AnalyseId==null){
        return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
    }
    models.CommentairePoudre.create({
            text:text,
            UtilisateurId:UtilisateurId,
            AnalyseId:AnalyseId,
        })
        .then(function(){
                models.Action.create({
                  action:"a commenté l'analyse poudre "+AnalyseId,
                  UtilisateurId:UtilisateurId
                })    
              })
        .then(function(/*newCommentaire*/){
            // getCommentairesOfAnalyseID(AnalyseId);
            models.AnalysePoudre.findOne({
                where: { id:AnalyseId },
                attributes:['id'],
                include: [
                  {
                    model: models.CommentairePoudre,
                    as: "commentaires",
                    attributes:['id','text','createdAt'],
                    include: [
                            {
                                model: models.Utilisateur,
                                as:'Utilisateur',
                                attributes:['id','fName','lName','pseudo','tel','url','isAdmin'],
                            },
                        ],
                  },
                ],
              }).then(function(foundAnalyse){
                // io.emit('commentPoudreAdded',foundAnalyse);
                return res.status(200).json({"code":"green","message":"Commentaire posté avec succes.","commentaires":foundAnalyse.commentaires})
              }).catch(function(error){
                // io.emit('commentPoudreNotAdded',{id:AnalysesId,commentaires:{text:error.message,Utilisateur:{pseudo:'undefined',id:1}}});
                return res.status(500).json({"code":"red","message":"impossible d'enregistrer ce commentaire ! : "+error.message})
                
              })
        })
        .catch(function(error){
            return res.status(500).json({"code":"red","message":"impossible d'enregistrer ce commentaire ! : "+error.message})
        })
    },
    all:function(req,res){
        models.CommentairePoudre.findAll({
            attributes:["id","text"],
            include:[
                {
                    model:models.Utilisateur,
                    attributes:['id','fName','lName','url','tel']
                },
                {
                    model:models.AnalysePoudre,
                    attributes:['id','name']
                }
            ]
        })
        .then(function(commentaires){
            if(commentaires){
                return res.status(200).json(commentaires)
            }else{
                return res.status(404).json({"code":"red","message":"Aucun don trouvé !"})
            }
        })
        .catch(function(){
            return res.status(404).json({"code":"red","message":"Impossible de charger les dons !"})
        })
    },
}