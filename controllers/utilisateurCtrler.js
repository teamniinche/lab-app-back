var bcrypt=require('bcrypt');
var jwt=require("../utils/jwt.generatedToken")
var models=require('../models');

function willUpdate(term1,term2){
    var term;
    if(term1!==null && term1!=="" && term1!==undefined){term=term1;
    }else{term=term2;}

    return term;
}
const attributes=["id","fName","lName","tel",'url',"email","pseudo","niv","createdAt","depart_affecte",'isAdmin'];

//Regex validation
const EMAIL_REGEX=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

module.exports.utilisateurCtrler={
    add:function(req,res){
        //params
        var fName=req.body.fName;
        var lName=req.body.lName;
        var tel=req.body.tel;
        var email=req.body.email;
        var pseudo=req.body.pseudo;
        var url=req.body.url;
        var password=req.body.password;
        var niv=req.body.niv;
        var isAdmin=req.body.isAdmin;
        var userId=req.body.userId;
        var depart_affecte=req.body.depart_affecte;

        if(fName==null || lName==null || tel==null || email==null || password==null || isAdmin==null || pseudo==null || depart_affecte==null){
            return res.status(400).json({"code":"red","message":"il manque des parametres necessaires ! "});
        }

        models.Utilisateur.findOne({
            attributes:['pseudo'],
            where:{pseudo:pseudo}
        })
        .then(function(UtilisateurFound){
            if(!UtilisateurFound){
                bcrypt.hash(password,5,function(error,bcryptedPassword){
                models.Utilisateur.create({
                        fName:fName,
                        lName:lName,
                        tel:tel,
                        email:email,
                        pseudo:pseudo,
                        url:url,
                        password:bcryptedPassword,
                        niv:niv,
                        depart_affecte:depart_affecte,
                        isAdmin:isAdmin
                    })
                    .then(function(){
                        models.Action.create({
                            action:"a ajouté l'utilisateur "+fName+" "+lName,
                            UtilisateurId:userId
                        })    
                    })
                    .then(()=>{
                        const users=models.Utilisateur.findAll({
                                attributes:attributes,
                                order: [['createdAt', 'ASC']]
                            })
                        return users;
                    })
                    .then(users=>{
                        return res.status(201).json({
                            "code":"green",//✅
                            "users":users,
                            "message":"Utilisateur ajouté avec succès !"
                        })
                    })
                    .catch(function(){
                        return res.status(500).json({
                            "code":"red",//🔴
                            "message":"impossible d'ajouter cet utilisateur ! "})
                    })
                })
            }else{
                return res.status(409).json({
                    "code":"yellow",//🔶
                    "message":"Cet utilisateur existe déjà !"})
            }
        })
        .catch(function(error){
            return res.status(500).json({
                "code":"red",//🔴
                "message":"Le serveur ne répond pas! "})
        })
    },
    login:function(req,res){
        var pseudo=req.body.pseudo;
        var password=req.body.password;
        // !EMAIL_REGEX.test(email)
        if(pseudo==null || password==null/*|| !EMAIL_REGEX.test(email)*/|| 4>password.length || password.length>50){
            return res.status(402).json({"code":"red","doesExist":false,"message":"Pseudo ou Mot de passe invalide ! "});
        }

        models.Utilisateur.findOne({
            where:{pseudo:pseudo},
	        attributes:["id","fName","lName","tel",'url',"email","pseudo","password","niv","depart_affecte",'isAdmin']
        }).then(function(UtilisateurFound){
            if(UtilisateurFound){
                const {password:undefined,...UtilisateurWithoutPassword}=UtilisateurFound.dataValues;
                bcrypt.compare(password,UtilisateurFound.password,function(errBcrypt,resBcrypt){
                    if(resBcrypt){
                        return res.status(200).json({
                            "code":"green",
			                "doesExist":true,
                            "message":"Connecté !",
                            "data":UtilisateurWithoutPassword,
                            "token":jwt.generatedToken(UtilisateurFound)
                        })
                    }else{
                        return res.status(401).json({"code":"red","doesExist":false,"message":"Mot de passe invalide !"});
                    }
                })
            }else{
                return res.status(404).json({"code":"red","doesExist":false,"message":"Compte inconnu!"});
            }
        })
        .catch(function(error){
            return res.status(500).json({"code":"red","doesExist":false,"message":"Execution interrompu ! :"+error.message});
        })
    },
    all:function(req,res){
        models.Utilisateur.findAll({
            attributes:attributes,
            order: [['createdAt', 'ASC']]
        })
        .then(function(Utilisateurs){
            if(Utilisateurs){
                return res.status(200).json(Utilisateurs)
            }else{
                return res.status(404).json({"code":"red","message":"Aucun utilisateur trouvé !"})
            }
        })
        .catch(function(error){
            return res.status(404).json({"code":"red","message":error})
        })
    },
    update:function(req,res){
        var id=req.params.id;
           //params
           var fNme=req.body.fName;
           var lNme=req.body.lName;
           var psdo=req.body.pseudo;
           var tel=req.body.tel;
           var email=req.body.email;
           var url=req.body.url;
           var niv=req.body.niv;
           var userId=req.body.userId;
           var depart_affecte=req.body.depart_affecte;
   
           if(fNme==null || lNme==null || tel==null || email==null || depart_affecte==null){
               return res.status(400).json({"code":"green","message":"il manque des parametres necessaires ! "});
           }
   
           models.Utilisateur.findOne({
               attributes:['fName','lName','tel','url','email','niv',"pseudo","depart_affecte"],
               where:{id:id}
           })
           .then(function(UtilisateurFound){
            const {fName,lName,pseudo}=UtilisateurFound;
               if(UtilisateurFound){
                    models.Utilisateur.update(
                        {
                            fName:willUpdate(fNme,UtilisateurFound.fName),
                            lName:willUpdate(lNme,UtilisateurFound.lName),
                            tel:willUpdate(tel,UtilisateurFound.tel),
                            pseudo:willUpdate(psdo,UtilisateurFound.pseudo),
                            email:willUpdate(email,UtilisateurFound.email),
                            url:willUpdate(url,UtilisateurFound.url),
                            niv:willUpdate(niv,UtilisateurFound.niv),
                            depart_affecte:willUpdate(depart_affecte,UtilisateurFound.depart_affecte)

                        },
                        {
                            where:{
                                id:id
                            },
                        },
                    )
                    .then(function(){
                        models.Action.create({
                            action:"a mis à jour l'utilisateur **"+id+" "+fName+" "+lName+" "+pseudo+" ** avec le niveau d'acces "+niv.split("_")[1],
                            UtilisateurId:userId
                        })    
                    })
                    .then(function(){
                         const users = models.Utilisateur.findAll({
                                attributes:attributes,
                                order: [['createdAt', 'ASC']]
                            })
                            .then(function(users){
                        return res.status(200).json({
                            "code":"green",//✅
                            "utilisateurs": users,
                            'message':"Utilisateur mis à jour !"
                        })})
                    })
                    .catch(function(error){
                        return res.status(500).json({
                            "code":"red",//🔴
                            "message":"impossible de mettre à jour cet utilisateur ! "})
                    })
               }else{
                   return res.status(409).json({
                       "code":"red",//🔴
                       "message":"Utilisateur introuvable !"})
               }
           })
           .catch(function(error){
            return res.status(500).json({
                "code":"red",//🔴
                "message":"Le serveur ne répond pas! "})
        })
    },
    changePwd:function(req,res){
           var pseudo=req.body.pseudo;
           var password=req.body.password;
   
           if(pseudo==null || password==null){
               return res.status(400).json({"code":"green","message":"il manque des parametres necessaires ! "});
           }
           
           models.Utilisateur.findOne({
               attributes:['id','fName','lName','tel','url','email','pseudo','niv','isAdmin', 'depart_affecte','pseudo'],
               where:{pseudo:pseudo}
           })
           .then(function(UtilisateurFound){
               if(UtilisateurFound){
                    bcrypt.hash(password,5,function(error,bcryptedPassword){
                            models.Utilisateur.update(
                                {
                                    password:bcryptedPassword
                                },
                                {
                                    where:{
                                        pseudo:pseudo
                                    },
                                },
                            )
                            .then(function(newUtilisateur){
                                return res.status(202).json({
                                    "code":"green",//✅
                                    'message':"Mot de passe bien mis à jour !",
                                    'data':newUtilisateur
                                })
                            })
                            .catch(function(error){
                                return res.status(500).json({
                                    "code":"red",//🔴
                                    "message":"changement non abouti ! "})
                            })
                    })
               }else{
                   return res.status(409).json({
                       "code":"red",//🔴
                       "message":"Utilisateur introuvable !"})
               }
           })
           .catch(function(error){
            return res.status(500).json({
                "code":"red",//🔴
                "message":"Le serveur ne répond pas! "})
        })
    },
    delete:function(req,res){
        const {userId,id}=req.params;

        if(isNaN(parseInt(id))){
            return res.status(400).json({"code":"red","message":"L'identifiant doit etre numerique !"})
        }
        models.Utilisateur.findOne({
            where:{id:id}
        })
        .then(function(Utilisateur){
            if(Utilisateur){
                const {fName,lName,pseudo}=Utilisateur;
                // try{
                models.Utilisateur.destroy({
                    where:{id:id},
                })
                .then(function(){
                        models.Action.create({
                            action:"a supprimé l'utilisateur ** "+id+" "+fName+" "+lName+" "+pseudo+" **",
                            UtilisateurId:userId
                        })    
                    })
                .then(function(Utilisateur){
                    return res.status(200).json({"code":"green","message":"Utilisateur "+id+" supprimé !"})
                })
                .catch(function(error){
                    return res.status(400).json({"code":"red","message":"Impossible de supprimer un utilisateur donateur dans une autre table !"})
                })
            }else{
                return res.status(500).json({"code":"red","message":"Utilisateur introuvable !"})
            }
        })
        .catch(function(error){
            return res.status(500).json({"code":"red","message":"Impossible de supprimer cet utilisateur !"})
        })
    },
    One:function(req,res){
        var id=parseInt(req.params.id);
        models.Utilisateur.findOne({
            // attributes:['fName','lName','email','isAdmin'],
            where:{id:id}
        })
        .then(function(UtilisateurFound){
            if(UtilisateurFound){
                return res.status(200).json({
                    fName:UtilisateurFound.fName,
                    lName:UtilisateurFound.lName,
                    tel:UtilisateurFound.tel,
                    pseudo:UtilisateurFound.pseudo,
                    niv:UtilisateurFound.niv,
                    email:UtilisateurFound.email,
                    url:UtilisateurFound.url,
                    depart_affecte:UtilisateurFound.depart_affecte,
                    isAdmin:UtilisateurFound.isAdmin
                })
            }else{
                return res.status(404).json({'code':'red',"message":"Aucun utilisateur ne correspond !"})
            }
        })
        .catch(function(error){
            return res.status(500).json({'code':'red',"message":"errorServer : impossible de charger la ressource !"})
        })
    },
    doesExist:function(req,res){
        var pseudo=req.body.pseudo;
        models.Utilisateur.findOne({
            where:{pseudo:pseudo},
            attributes:['id','fName','lName','pseudo','url','isAdmin','email','niv','depart_affecte','tel']
        })
        .then(function(UtilisateurFound){
            if(UtilisateurFound){return res.status(200).json({'code':'green','doesExist':true,data:UtilisateurFound})
            }else{return res.status(404).json({'code':'yellow','doesExist':false})}
        })
        .catch(function(error){
            return res.status(500).json({"errorServer":"impossible d'aboutir la requete'!"})
        })
    }
}