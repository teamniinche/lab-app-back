var models=require('../models');

// var io;
// module.exports.setSocketIoC = function (socketIoInstance) {
//     io = socketIoInstance;
//   };
// var comments;
// const getCommentairesOfAnalyseID = (id) => models.Analyse.findOne({
//         where: { id:id },
//         attributes:['id'],
//         include: [
//           {
//             model: models.Commentaire,
//             as: "commentaires",
//             attributes:['id','text','createdAt'],
//             include: [
//                     {
//                         model: models.Utilisateur,
//                         attributes:['id','fName','lName','tel','isAdmin'],
//                     },
//                 ],
//           },
//         ],
//       }).then(function(foundAnalyse){
//         return foundAnalyse;
//       })
// var {io}=require('./analyseCtrler'); // Instance de socket.io
// Fonction pour initialiser socket.io
// module.exports.setSocketIoForComments = function (socketIoInstance) {
//   io = socketIoInstance;
// };

module.exports.commentaireCtrler={
    add:function(req,res){
    //params
    var text=req.body.text;
    var UtilisateurId=req.body.UtilisateurId;
    var AnalyseId=req.body.AnalyseId;

    if(text==null || UtilisateurId==null || AnalyseId==null){
        return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
    }
    models.Commentaire.create({
            text:text,
            UtilisateurId:UtilisateurId,
            AnalyseId:AnalyseId,
        })
        .then(function(){
                models.Action.create({
                  action:"a commenté l'analyse liquide "+AnalyseId,
                  UtilisateurId:UtilisateurId
                })    
              })
        .then(function(/*newCommentaire*/){
            // getCommentairesOfAnalyseID(AnalyseId);
            models.Analyse.findOne({
                where: { id:AnalyseId },
                attributes:['id'],
                include: [
                  {
                    model: models.Commentaire,
                    as: "commentaires",
                    attributes:['id','text','createdAt'],
                    include: [
                            {
                                model: models.Utilisateur,
                                as:'Utilisateur',
                                attributes:['id','fName','lName','tel','url','isAdmin'],
                            },
                        ],
                  },
                ],
              })
              .then(function(foundAnalyse){
            //     io.emit('commentAdded',foundAnalyse);
            //   })
            //   .catch(function(error){
            //     io.emit('commentAdded',{commentaires:[{text:error.message}]});
            //   })
            // io.emit('commentAdded',comments)
            return res.status(201).json({
                "code":"green",
                "message":"Comment saved"+foundAnalyse.id
            })
             })
        })
        .catch(function(error){
            return res.status(500).json({"code":"red","message":"impossible d'enregistrer ce commentaire ! : "+error.message})
        })
    },
    all:function(req,res){
        models.Commentaire.findAll({
            attributes:["id","text"],
            include:[
                {
                    model:models.Utilisateur,
                    attributes:['id','fName','lName','url','tel']
                },
                {
                    model:models.Analyse,
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
    // One:function(req,res){
    //     var id=req.params.id;
    //     models.Don.findOne({
    //         where:{id:id},
    //         include:[
    //             {
    //                 model:models.Locality,
    //                 attributes:['id','com','loc']
    //             },
    //             {
    //                 model:models.User,
    //                 attributes:['id','fName','lName']
    //             }
    //         ]
    //     })
    //     .then(function(donFound){
    //         if(donFound){
    //             return res.status(200).json({
    //                 respoName:donFound.respoName,
    //                 respoContact:donFound.respoContact,
    //                 nberOfKit:donFound.nberOfKit,
    //                 nberOfImpacted:donFound.nberOfImpacted,
    //                 UserId:donFound.UserId,
    //                 LocalityId:donFound.Locality.loc//donFound.localityId
    //             })
    //         }else{
    //             return res.status(404).json({"code":"yellow","message":"ressource introuvable !"})
    //         }
    //     })
    //     .catch(function(error){
    //         return res.status(500).json({"code":"red","message":"impossible de charger la ressource !"})
    //     })
    // },
    // update:function(req,res){
    //         var id=req.params.id;
    //         var rpoName=req.body.respoName;
    //         var rpoContact=req.body.respoContact;
    //         var nOfKit=req.body.nberOfKit;
    //         var nOfImpacted=req.body.nberOfImpacted;
    //         var userId=req.body.userId;
    //         var localityId=req.body.localityId;
   
    //         if(rpoName==null || nOfKit==null || rpoContact==null || userId==null || localityId==null){
    //             return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
    //         }

    //         models.Don.findOne({
    //             attributes:['respoName','respoContact','nberOfKit','nberOfImpacted','UserId','LocalityId'],
    //             where:{id:id}
    //         })
    //         .then(function(don){
    //             if(don){
    //                 models.Don.update(
    //                 {
    //                     respoName:willUpdate(rpoName,don.respoName),
    //                     respoContact:willUpdate(rpoContact,don.respoContact),
    //                     nberOfKit:willUpdate(nOfKit,don.nberOfKit),
    //                     nberOfImpacted:nOfImpacted?willUpdate(nOfImpacted,don.nberOfImpacted):null,
    //                     UserId:willUpdate(userId,don.UserId),
    //                     LocalityId:willUpdate(localityId,don.LocalityId)
    //                 },
    //                 {
    //                     where:{
    //                         id:id
    //                     }
    //                 })
    //                 .then(function(){
    //                     return res.status(202).json({
    //                         "code":"green",//✅
    //                         'message':"Don mis à jour avec succès !"
    //                     })
    //                 })
    //                 .catch(function(error){
    //                     return res.status(500).json({
    //                         "code":"red",//🔴
    //                         "message":error.message})
    //                 })
    //            }else{
    //                return res.status(409).json({
    //                    "code":"red",//🔴
    //                    "message":"Don introuvable !"
    //                 })
    //            }
    //        }) 
    // },
    // delete:function(req,res){
    //     var id=req.params.id;

    //     if(isNaN(parseInt(id))){
    //         return res.status(402).json({"code":"red","message":"Id invalide !"})
    //     }

    //     models.Don.findOne({
    //         where:{id:id}
    //     })
    //     .then(function(donFound){
    //         if(donFound){
    //             models.Don.destroy({
    //                 where:{id:id}
    //             })
    //             .then(function(donFound){
    //                 return res.status(203).json({
    //                     "code":"yellow",
    //                     "message":"Le don "+id+" supprimé avec succès !"
    //                 })
    //             })
    //             .catch(function(){
    //                 res.status(400).json({
    //                     "code":"red",
    //                     "message":"Impossible de supprimer ce don !"
    //                 })
    //             })
    //         }else{
    //             return res.status(404).json({"code":"yellow","message":"Don introuvable !"})
    //         }
    //     })
    //     .catch(function(){
    //         return res.status(404).json({
    //             "code":"yellow",
    //             "message":"don introuvable"
    //         })
    //     })
    // },
}