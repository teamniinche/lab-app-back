var models=require('../models');

// var io;
// module.exports.setSocketIoV = function (socketIoInstance) {
//     io = socketIoInstance;
//   };

module.exports.validationPoudreCtrler={
    update:function(req,res){
        //params
        const {id,ok,validation,UtilisateurId}=req.body;

        if(ok===null || UtilisateurId===null || id===null){
            return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
        }
        models.ValidationPoudre.update({
                ok:ok,
                validation:validation,
                UtilisateurId:UtilisateurId,
            },
            {
                where:{
                    id:id
                }
            }
            )
            // .then(function(){
            //     io.emit('validated',{"code":"green","validation":validation});
            // })
            .then(function(){
                return res.status(200).json({
                    "code":"green",
                    "message":"Validation updated successfully"
                })
            })
            .catch(function(error){
                return res.status(500).json({"code":"red","message":"validation impossible ! : "+error.message})
            })
        },
    all:function(req,res){
        models.ValidationPoudre.findAll({
            attributes:["id","ok","validation",'updatedAt'],
            include:[
                {
                    model:models.AnalysePoudre,
                    attributes:['id','name','observations','createdAt']
                },
                {
                    model:models.Utilisateur,
                    attributes:['id','fName','lName','tel']
                }
            ]
        })
        .then(function(validations){
            if(validations){
                return res.status(200).json(validations)
            }else{
                return res.status(404).json({"code":"red","message":"Aucun validation trouvé !"})
            }
        })
        .catch(function(){
            return res.status(404).json({"code":"red","message":"Impossible de charger les validations !"})
        })
    },
}