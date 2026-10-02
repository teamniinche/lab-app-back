var models=require('../models');
const {allAnalyses}=require('../controllers/analysePoudreCtrler');
function isAlready(validation,action){
        return validation && Object.values(validation || {}).map(v=>v?.action).includes(action);
    }
function isToInject(validation){
        const actions=validation?Object.values(validation || {}).map(v=>v?.action):[];
        return actions.includes('isolate') && !actions.includes('inject');
    }
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
    // act:function(req,res){
    //         const {id,action,UtilisateurId,startedAt,endedAt}=req.body;
    //         const REQ={query:{started:startedAt,endedAt:endedAt}};

    //         if(!UtilisateurId || !id){
    //             return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
    //         }
    //         models.ValidationPoudre.findOne(
    //                                             {
    //                                                 where:{AnalyseId:id},
    //                                                 attributes:['id','ok','validation']
    //                                             }
    //                                         )
    //                                         .then(function(foundValidation){
    //                                             const {ok,validation}=foundValidation;
    //                                             const VALIDATION=validation?validation:{};
                                                
    //                                             if(foundValidation){
    //                                                 if(isAlready(validation,action)){
    //                                                         throw new Error("chariot already "+action)
    //                                                 }
    //                                                 return models.ValidationPoudre.update({
    //                                                     ok:ok,
    //                                                     validation:{...VALIDATION,[(Date.now()).toString()]:{UtilisateurId:parseInt(UtilisateurId),action:action,createdAt:Date.now()}},
    //                                                     },
    //                                                     {
    //                                                         where:{id:foundValidation.id}
    //                                                     }
    //                                                 )
    //                                                 // return newValidation;
            
    //                                             }else{
    //                                                 return models.ValidationPoudre.create({
    //                                                     ok:false,
    //                                                     validation:{[Date.now().toString()]:{UtilisateurId:parseInt(UtilisateurId),action:action,createdAt:Date.now()}},
    //                                                     UtilisateurId:parseInt(UtilisateurId),
    //                                                     AnalyseId:parseInt(id),
    //                                                 })
    //                                                 // return newValidation;
    //                                             }

    //                                         })
    //                                         .then(function(/*newValidation*/){
    //                                             const msg=action==='isolate'?"a isolé l'analyse "+id:"a injecté l'analyse "+ id;
    //                                                 return models.Action.create({
    //                                                             action:msg,
    //                                                             UtilisateurId:parseInt(UtilisateurId)
    //                                                         }) 
    //                                                     // return newValidation
    //                                             })
    //                                         .then(function(){
    //                                             const analyses=allAnalyses(REQ,res)
    //                                             return analyses;
    //                                             })
    //                                         .then(function(analyses){
    //                                         // .then(function(newValidation){
    //                                             return res.status(200).json({
    //                                                 // "validation":newValidation,
    //                                                 "analyses":analyses,
    //                                                 "code":"green",
    //                                                 "message":"Action executed successfully"
    //                                             })
    //                                         })
    //                                         .catch(function(error){
    //                                             const code=error.message.includes('already')?"yellow":"red";
    //                                             return res.status(500).json({"code":code,"message":"action impossible ! : "+message})
    //                                         })
    //     },
    act: async function(req, res) {
    const { id, action, UtilisateurId, startedAt, endedAt } = req.body;
    
    // Correction de la clé pour correspondre à ce qu'attend votre fonction allAnalyses
    const REQ = { query: { startedAt: startedAt, endedAt: endedAt } };

    // 1. Validation de sécurité des paramètres obligatoires
    if (!UtilisateurId || !id) {
        return res.status(400).json({ "code": "red", "message": "il manque des paramètres nécessaires ! " });
    }

    try {
        // 2. Recherche de la validation existante pour cette analyse
        const foundValidation = await models.ValidationPoudre.findOne({
            where: { AnalyseId: id },
            attributes: ['id', 'ok', 'validation']
        });

        const timestampKey = Date.now().toString();

        if (foundValidation) {
            const { ok, validation } = foundValidation;
            const VALIDATION = validation ? validation : {};
            
            // Sécurité métier : évite de répéter une action déjà enregistrée
            if (isAlready(validation, action)) {
                throw new Error(`chariot already ${action}`);
            }

            // Mise à jour de l'historique de validation existant
            await models.ValidationPoudre.update({
                ok: ok,
                validation: {
                    ...VALIDATION,
                    [timestampKey]: { 
                        UtilisateurId: parseInt(UtilisateurId), 
                        action: action, 
                        createdAt: new Date() 
                    }
                }
            }, {
                where: { id: foundValidation.id }
            });

        } else {
            // Création d'un nouvel enregistrement de validation si inexistant
            await models.ValidationPoudre.create({
                ok: false,
                validation: {
                    [timestampKey]: { 
                        UtilisateurId: parseInt(UtilisateurId), 
                        action: action, 
                        createdAt: new Date() 
                    }
                },
                UtilisateurId: parseInt(UtilisateurId),
                AnalyseId: parseInt(id)
            });
        }

        // 3. Enregistrement du message d'audit dans la table des actions
        const msg = action === 'isolate' ? `a isolé l'analyse ${id}` : `a injecté l'analyse ${id}`;
        await models.Action.create({
            action: msg,
            UtilisateurId: parseInt(UtilisateurId)
        });

        // 4. Récupération de la liste des analyses mise à jour
        const analyses = await allAnalyses(REQ, res);

        // 5. Réponse positive au Frontend
        return res.status(200).json({
            "analyses": analyses,
            "code": "green",
            "message": "Action executed successfully"
        });

    } catch (error) {

        // Détermination du code couleur (yellow si l'action a déjà été faite, red si plantage SQL/Réseau)
        const code = error.message.includes('already') ? "yellow" : "red";
        
        // Correction de l'affichage de l'erreur (usage de error.message au lieu de 'message')
        return res.status(500).json({
            "code": code,
            "message": "action impossible ! : " + error.message
        });
    }
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