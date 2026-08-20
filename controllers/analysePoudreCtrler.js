/*
                                            Table ½ public.analysesPoudre ╗
    Colonne     |           Type           | Collationnement | NULL-able |                  Par dÚfaut                  ----------------+--------------------------+-----------------+-----------+---------------------------------------------- id             | integer                  |                 | not null  | nextval('"analysesPoudre_id_seq"'::regclass)
 nChar          | integer                  |                 | not null  |
 name           | character varying(255)   |                 | not null  |
 taches         | character varying(255)   |                 |           | NULL::character varying
 parfum         | character varying(255)   |                 |           | NULL::character varying
 type           | character varying(255)   |                 | not null  |
 lansa          | character varying(255)   |                 |           | NULL::character varying
 format         | character varying(255)   |                 |           | NULL::character varying
 matiere_active | double precision         |                 |           |
 alcanite       | double precision         |                 |           |
 humidite       | double precision         |                 |           |
 gg             | double precision         |                 |           |
 silicate       | integer                  |                 |           |
 sel            | double precision         |                 |           |
 densite        | double precision         |                 |           |
 compression    | integer                  |                 |           |
 percarbonate   | character varying(255)   |                 |           | NULL::character varying
 mousses        | boolean                  |                 |           |
 observations   | character varying(255)   |                 |           | 'RAS'::character varying
 UtilisateurId  | integer                  |                 | not null  |
 createdAt      | timestamp with time zone |                 | not null  | CURRENT_TIMESTAMP
 updatedAt      | timestamp with time zone |                 | not null  | CURRENT_TIMESTAMP
*/
/** DELETE
 * ✅📈Succès                200    OK                               Suppression réussie, renvoie un message ou l'objet supprimé.
 * ✅Succès                   204    No Content                       Suppression réussie, aucun contenu renvoyé (recommandé).
 * ⚠️Ressource introuvable    404    Not Found                        La ressource n'existe pas ou a déjà été supprimée.
 * ❌Échec (Authentification) 401    Unauthorized                     L'utilisateur doit se connecter pour supprimer.
 * ❌Échec (Permissions)      403    Forbidden                        L'utilisateur est connecté mais n'a pas les droits.
 * ❌Échec (Requête)          400    Bad Request                      L'identifiant envoyé est mal formé (ex: texte au lieu d'un ID numérique).
 * ❌Échec (Serveur / BDD)    500    Internal Server Error            Erreur serveur (ex: contrainte de clé étrangère qui bloque en base).
 */
/** POST | CREATE
 * ✅📈Succès (Créé)            201      Created                      La ressource a été créée avec succès (recommandé).Renvoie souvent l'objet créé.
 * ✅Succès (En cours)          202      Accepted                     La demande est reçue, mais la création se fera en arrière-plan (ex: traitement lourd).
 * ❌Échec (Données invalides)  422      Unprocessable Entity         Les données envoyées ne respectent pas le format (ex: email invalide, champ obligatoire manquant).
 * ❌Échec (Doublon)            409      Conflict                     La ressource existe déjà (ex: tentative de créer un compte avec un email déjà pris).
 * ❌Échec (Authentification)   401      Unauthorized                 L'utilisateur doit se connecter pour créer cette ressource.
 * ❌Échec (Permissions)        403      Forbidden                    L'utilisateur n'a pas le rôle requis pour créer cette ressource.
 * ❌Échec (Serveur / BDD)      500      Internal Server Error        Erreur technique (ex: plantage de la base de données Heroku).
 */

/** UPDATE
 * ✅📈Succès (Modifié)        200       OK                           La modification a réussi. Renvoie généralement l'objet mis à jour.
 * ✅Succès (Sans retour)      204       No Content                   La modification a réussi, mais le serveur ne renvoie aucun contenu.
 * ⚠️Ressource introuvable     404       Not Found                    La ressource à modifier n'existe pas dans la base de données.
 * ❌Échec (Données invalides) 422       Unprocessable Entity         Les nouvelles données ne sont pas valides (ex: texte trop long, mauvais type).
 * ❌Échec (Authentification)  401       Unauthorized                 L'utilisateur doit se connecter pour modifier.
 * ❌Échec (Permissions)       403       Forbidden                    L'utilisateur n'a pas le droit de modifier cette ressource spécifique.
 * ❌Échec (Serveur / BDD)     500       Internal Server Error        Erreur technique (ex: une contrainte SQL empêche la mise à jour).
 */
const  models = require('../models');
const { Op } = require("sequelize");
const sendToWhatsApp=require('../whatsapp').sendToWhatsApp
const {validationPoudreCtrler}=require("./validationPoudreCtrler");
const startedAtDefault='2025-04-01';
const endedAtDefault='2100-12-31'
const attributes=[
                    "id",
                    "nChar",
                    "identifier",
                    "name",
                    "nom",
                    "taches",
                    "parfum",
                    "type",
                    "categorie",
                    "lansa",
                    "format",
                    "matiere_active",
                    "alcanite",
                    "humidite",
                    "gg",
                    "silicate",
                    "sel",
                    "densite",
                    "compression",
                    "percarbonate",
                    "mousses",
                    "observations",
                    "createdAt",
                    "updatedAt"
                ];
const includes=[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.CommentairePoudre,
                          as:'commentaires',
                          attributes:['id','text','AnalyseId','createdAt'],
                          include:[
                             { 
                                  model:models.Utilisateur,
                                  attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                              }
                          ]
                      },
                      {
                          model: models.ValidationPoudre,
                          as: "validation",
                          include: [
                                  {
                                      model: models.Utilisateur,
                                      as:'Utilisateur',
                                      attributes:['id','fName','lName','pseudo','tel','url','isAdmin'],
                                  },
                              ],
                          attributes:['id','ok','validation','updatedAt','createdAt'],
                        }
                  ];
function dates(date1,date2){
    const date3 = new Date(date1); // Date de début
    const date4 = new Date(date2); // Date de fin
    // Définit les heures spécifiques
    const startDate = new Date(date3);startDate.setHours(7, 0, 0, 0); // date0 à 07:00
    const endDate = new Date(date4);endDate.setHours(7, 0, 0, 0); // date1 à 07:00
    return {startDate:startDate,endDate:endDate};
}

function willUpdate(term1,term2){
    var term;
    var term02=term2===undefined?null:term2;
    if(term1!==null && term1!=="" && term1!==undefined){term=term1;
    }else{term=term02;}

    return term;
}

const allAnalyses= async (req, res)=>{
    const startedAt = req.query.startedAt || startedAtDefault;
    const endedAt = req.query.endedAt || endedAtDefault;
    const { startDate, endDate } = dates(startedAt, endedAt);
    
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = 10000; 
        const offset = (page - 1) * limit; 

        const { rows, count } = await models.AnalysePoudre.findAndCountAll({
            where: {
                createdAt: { [Op.between]: [startDate, endDate] }
            },
            attributes:attributes,
            include: [
                {
                    model: models.Utilisateur,
                    attributes: ['id', 'fName', 'lName', 'pseudo', 'tel', 'isAdmin']
                },
                {
                    model: models.CommentairePoudre,
                    as: 'commentaires',
                    attributes: ['id', 'text', 'AnalyseId', 'createdAt'],
                    include: [
                        {
                            model: models.Utilisateur,
                            attributes: ['id', 'fName', 'lName', 'pseudo', 'tel', 'url', 'isAdmin']
                        }
                    ],
                    distinct: true,
                },
                {
                    model: models.ValidationPoudre,
                    as: "validation",
                    include: [
                        {
                            model: models.Utilisateur,
                            as: 'Utilisateur',
                            attributes: ['id', 'fName', 'lName', 'pseudo', 'tel', 'url', 'isAdmin'],
                        },
                    ],
                    distinct: true,
                    attributes: ['id', 'ok', 'validation', 'createdAt', 'updatedAt'],
                }
            ],
            distinct: true,
            limit: limit,
            offset: offset,
            order: [['createdAt', 'ASC']], 
        });
        
            const lansas=await rows.filter(analyse=>analyse.type==="lansa");
            const formules=await rows.filter(analyse=>analyse.type==="fini");
            return {lansas:lansas,formules:formules};

    } catch (error) {
        return {lansas:[error.message],formules:[error.message]};
    }
};

function Update(req,res,foundAnalyse){
                // var id=parseFloat(req.params.id);
                var id=foundAnalyse?.id;
                const { 
                    nChar,
                    name,
                    nom,
                    taches,
                    parfum,
                    type,
                    categorie,
                    lansa,
                    format,
                    matiere_active,
                    alcanite,
                    humidite,
                    gg,
                    silicate,
                    sel,
                    densite,
                    compression,
                    percarbonate,
                    mousses,
                    observations,
                    UtilisateurId
                }=req.body;
    
            if(UtilisateurId==null){
                    return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
            }
            if(isNaN(id)){return res.status(400).json({"code":"red","message":"L'ID est nul ou indéfini ! "});}

            return new Promise((resolve,reject)=> models.AnalysePoudre.findOne({
                    attributes:[    "id",
                                    "nChar",
                                    "name",
                                    "taches",
                                    "parfum",
                                    "type",
                                    "categorie",
                                    "lansa",
                                    "format",
                                    "matiere_active",
                                    "alcanite",
                                    "humidite",
                                    "gg",
                                    "silicate",
                                    "sel",
                                    "densite",
                                    "compression",
                                    "percarbonate",
                                    "mousses",
                                    "observations"
                                ],
                    where:{id:id}
                })
                .then(function(analyse){
                    if(analyse){
                        models.AnalysePoudre.update(
                        {
                            nChar:willUpdate(parseFloat(nChar),analyse.nChar),
                            name:willUpdate(name,analyse.name),
                            nom:willUpdate(nom,analyse.nom),
                            taches:willUpdate(taches,analyse.taches),
                            parfum:willUpdate(parfum,analyse.parfum),
                            type:willUpdate(type,analyse.type),
                            categorie:willUpdate(categorie,analyse.categorie),
                            lansa:willUpdate(lansa,analyse.lansa),
                            matiere_active:willUpdate(parseFloat(matiere_active),analyse.matiere_active),
                            format:willUpdate(format,analyse.format),

                            densite:willUpdate(parseInt(densite)||null,analyse.densite),
                            alcanite:willUpdate(parseFloat(alcanite)||null,analyse.alcanite),
                            humidite:willUpdate(parseFloat(humidite)||null,analyse.humidite),
                            gg:willUpdate(parseFloat(gg)||null,analyse.gg),
                            sel:willUpdate(parseFloat(sel)||null,analyse.sel),

                            silicate:willUpdate(parseFloat(silicate)|| null,analyse.silicate),
                            compression:willUpdate(parseFloat(compression)|| null,analyse.compression),

                            percarbonate:willUpdate(parseFloat(percarbonate)||null,analyse.percarbonate),

                            mousses:willUpdate(mousses,analyse.mousses),
                            observations:analyse.observations+" & "+observations,// willUpdate(observations,analyse.observations),
                            // UtilisateurId:analyse.UtilisateurId
                        },
                        {
                            where:{
                                id:id
                            },
                            returning: true, // 👈 Obligatoire pour PostgreSQL
                            plain: true 
                        }) 
                .then(function(analyseUpdated){
                // io.emit("analysePoudreUpdated", analyseUpdated[1]); // Emit l'analyse mise à jour
                models.Action.create({
                    action:"a mis à jour l'analyse "+id,
                    UtilisateurId:parseInt(UtilisateurId)
                })    
                })
                .then(function(){
                            if(observations!=='RAS'){
                                models.ValidationPoudre.findOne(
                                    {
                                        where:{AnalyseId:id},
                                        attributes:['id','ok','validation']
                                    }
                                )
                                .then(function(foundValidation){
                                    if(foundValidation){
                                        return foundValidation.validation!=='Isolated' && models.ValidationPoudre.update({
                                            ok:false,
                                            validation:"",
                                            UtilisateurId:UtilisateurId
                                            },
                                            {
                                                where:{id:foundValidation.id}
                                            }
                                        )

                                    }else{
                                        return models.ValidationPoudre.create({
                                            ok:false,
                                            validation:"",
                                            UtilisateurId:UtilisateurId,
                                            AnalyseId:analyse.id,
                                        })

                                    }
                                })
                        }
                    })
                .then(function(){
                    const analyses=allAnalyses(req,res)
                    return analyses;
                    })
                .then(function(analyses){
                            resolve({
                                "id":id,
                                "analyses":analyses,
                                "code":"green",//✅
                                'message':"Analyse for id="+id+" updated !"
                            })
                        })
                .catch(function(error){
                            reject({
                                "code":"red",//🔴
                                "message":error.message})
                    })
            }else{
                        reject({
                            "code":"red",//🔴
                            "message":"Analyse not found !"
                            })
            }
        }) 
    )// end Promise
    }
function Add(req,res,newAnalyse){
     return new Promise((resolve,reject)=>
            models.AnalysePoudre.create(newAnalyse)
                .then(function(createdAnalyse){
                    if(createdAnalyse.observations!=="RAS"){
                        models.ValidationPoudre.create({
                                    ok:false,
                                    validation:"",
                                    UtilisateurId:newAnalyse.UtilisateurId,
                                    AnalyseId:createdAnalyse.id,
                                })
                    }
                    return createdAnalyse;
                }) 
        // .then(function(creatdAnalyse){
        //     io.emit("analysePoudreAdded", creatdAnalyse);
        // })
        .then(function(crtdAnalyse){
            const analyses=allAnalyses(req,res);
            return {analyses:analyses,createdAnalyse:crtdAnalyse};
        })
        .then(function(data){
            const {analyses,createdAnalyse}=data;
            resolve({
                // "id":data.createdAnalyse.id,
                "analyses":analyses,
                "analyse":createdAnalyse,
                "code":"green",
                "message":"Analyse created"
            })
        })
        .catch(function(error){
            reject({"code":"red",analyse:newAnalyse,"message":"impossible d'enregistrer cette analyse ! "+error.message})
        })
    )// end Promise
}




module.exports.analysePoudreCtrler={
    allAnalysesPoudre:async function(req, res){
    const startedAt = req?.query?.startedAt || startedAtDefault;
    const endedAt = req?.query?.endedAt || endedAtDefault;
    const { startDate, endDate } = dates(startedAt, endedAt);
    
    try {
        const page = parseInt(req?.query?.page) || 1; 
        const limit = 10000; 
        const offset = (page - 1) * limit; 

        const { rows, count } = await models.AnalysePoudre.findAndCountAll({
            where: {
                createdAt: { [Op.between]: [startDate, endDate] }
            },
            attributes:attributes,
            include: [
                {
                    model: models.Utilisateur,
                    attributes: ['id', 'fName', 'lName', 'pseudo', 'tel', 'isAdmin']
                },
                {
                    model: models.CommentairePoudre,
                    as: 'commentaires',
                    attributes: ['id', 'text', 'AnalyseId', 'createdAt'],
                    include: [
                        {
                            model: models.Utilisateur,
                            attributes: ['id', 'fName', 'lName', 'pseudo', 'tel', 'url', 'isAdmin']
                        }
                    ],
                    distinct: true,
                },
                {
                    model: models.ValidationPoudre,
                    as: "validation",
                    include: [
                        {
                            model: models.Utilisateur,
                            as: 'Utilisateur',
                            attributes: ['id', 'fName', 'lName', 'pseudo', 'tel', 'url', 'isAdmin'],
                        },
                    ],
                    distinct: true,
                    attributes: ['id', 'ok', 'validation', 'createdAt', 'updatedAt'],
                }
            ],
            distinct: true,
            limit: limit,
            offset: offset,
            order: [['createdAt', 'ASC']], 
        });
        
            const lansas=await rows.filter(analyse=>analyse.type==="lansa");
            const formules=await rows.filter(analyse=>analyse.type==="fini");
            return {lansas:lansas,formules:formules};

    } catch (error) {
        return {lansas:[error.message],formules:[error.message]};
    }
},
    getAnalysePoudre:async function(req,res){
            var id=req?.params?.id || 101;
            const analyse=models.AnalysePoudre.findOne({
                where:{id:id},
                attributes:["id",
                                    "nChar",
                                    "name",
                                    "taches",
                                    "parfum",
                                    "type",
                                    "categorie",
                                    "lansa",
                                    "format",
                                    "matiere_active",
                                    "alcanite",
                                    "humidite",
                                    "gg",
                                    "silicate",
                                    "sel",
                                    "densite",
                                    "compression",
                                    "percarbonate",
                                    "mousses",
                                    "observations",
                                    "createdAt",
                                    "updatedAt"],
                include:[
                    {
                        model:models.Utilisateur,
                        as:'Utilisateur',
                        attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                    },
                    {
                        model:models.ValidationPoudre,
                        as:'validation',
                        attributes:['id','ok','validation','createdAt','updatedAt'],
                        include:[
                            {
                                model:models.Utilisateur,
                                as:'Utilisateur',
                                attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                            }
                        ]
                    }
                ]
            })
            .then(function(analyseFound){
                if(analyseFound){
                    return {ok:true,analyse:analyseFound}

                }else{
                    return {ok:false,message:"Les données de l'analyse Poudre sont corrompues ou introuvables.",analyse:{message:"Les données de l'analyse Poudre sont corrompues ou introuvables."}}
                    // throw new Error("Les données de l'analyse Poudre sont corrompues ou introuvables.");
   
                }
            })
            .catch(function(error){
                return {ok:false,message:"impossible de charger la ressource ! "+error.message,analyse:{message:"impossible de charger la ressource ! "+error.message}}
            })

            return analyse;
        },
    // ================== POST ================================
    add:function(req,res){
        const startedAt= req.query.startedAt || startedAtDefault;
        const endedAt= req.query.endedAt || endedAtDefault;
        const {startDate,endDate}=dates(startedAt,endedAt);
    /*
        req==={
            alcanite: "10",
            ​chariot: 1,
            ​compression: null,
            categorie:"get"||"extra"||"diam"||"local"
            ​couleur: "white",
            ​format: Array(3) [ "80g", "15g", "60g" ],
            ​gg: "1",
            ​humidite: "2",
            ​identifier: "1_1779405884969",
            ​matiere_active: "15",
            ​mousses: false,
            ​name: "Extra 1 sans sel",
            ​nom: "Madar",
            ​parfum: "Citron",
            ​percarbonate: false,
            ​taches: "blue"
        }
    ​*/
    //params
    const {
        nChar,
        identifier,
        name,
        nom,
        taches,
        parfum,
        // type,
        categorie,
        lansa,
        format,
        matiere_active,
        alcanite,
        humidite,
        gg,
        silicate,
        sel,
        densite,
        compression,
        percarbonate,
        mousses,
        observations,
        UtilisateurId
     }=req.body;

    if(UtilisateurId==null){
        return res.status(422).json({"code":"red","message":"Nom du chimiste est requis !"});
    }

    // var newId;var nwAnalyse;
    const newAnalyse={
            nChar:parseInt(nChar),
            identifier:identifier,
            name:name,
            nom:nom,
            taches:taches,
            parfum:parfum,
            type:format!==undefined?'fini':'lansa',
            categorie:categorie,
            lansa:lansa,
            format:format,
            matiere_active:parseFloat(matiere_active) || undefined,
            alcanite:parseFloat(alcanite) || undefined,
            humidite:parseFloat(humidite) || undefined,
            gg:parseFloat(gg) || undefined,
            silicate:parseFloat(silicate) || undefined,
            sel:parseFloat(sel) || undefined,
            densite:parseInt(densite) || undefined,
            compression:parseFloat(compression) || undefined,
            percarbonate:parseFloat(percarbonate) || undefined,
            mousses:mousses,
            observations:observations,
            UtilisateurId:parseInt(UtilisateurId)
        }

        models.AnalysePoudre.findOne({
                    attributes:attributes,
                    where:{
                        nChar:nChar,
                        name:name,
                        createdAt: {[Op.between]: [startDate, endDate]}
                    }
                })
        .then(function(foundAnalyse){
            if(foundAnalyse){
                const updated=Update(req,res,foundAnalyse);
                return updated;
            }else{
                const added=Add(req,res,newAnalyse);
                return added;
            }
        })
        .then(function(response){
            return res.status(200).json(response)
        })
        .catch(function(response){
            return res.status(500).json(response)
        })
    },

    // ================== UPDATE ==============================
    update:function(req,res){
                var id=parseFloat(req.params.id);
                const { 
                    nChar,
                    name,
                    nom,
                    taches,
                    parfum,
                    type,
                    categorie,
                    lansa,
                    format,
                    matiere_active,
                    alcanite,
                    humidite,
                    gg,
                    silicate,
                    sel,
                    densite,
                    compression,
                    percarbonate,
                    mousses,
                    observations,
                    UtilisateurId
                }=req.body;
    
            if(UtilisateurId==null){
                    return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
            }

                models.AnalysePoudre.findOne({
                    attributes:[    "id",
                                    "nChar",
                                    "name",
                                    "taches",
                                    "parfum",
                                    "type",
                                    "categorie",
                                    "lansa",
                                    "format",
                                    "matiere_active",
                                    "alcanite",
                                    "humidite",
                                    "gg",
                                    "silicate",
                                    "sel",
                                    "densite",
                                    "compression",
                                    "percarbonate",
                                    "mousses",
                                    "observations"
                                ],
                    where:{id:id}
                })
                .then(function(analyse){
                    if(analyse){
                        models.AnalysePoudre.update(
                        {
                            nChar:willUpdate(parseFloat(nChar),analyse.nChar),
                            name:willUpdate(name,analyse.name),
                            nom:willUpdate(nom,analyse.nom),
                            taches:willUpdate(taches,analyse.taches),
                            parfum:willUpdate(parfum,analyse.parfum),
                            type:willUpdate(type,analyse.type),
                            categorie:willUpdate(categorie,analyse.categorie),
                            lansa:willUpdate(lansa,analyse.lansa),
                            matiere_active:willUpdate(parseFloat(matiere_active),analyse.matiere_active),
                            format:willUpdate(format,analyse.format),

                            densite:willUpdate(parseInt(densite)||null,analyse.densite),
                            alcanite:willUpdate(parseFloat(alcanite)||null,analyse.alcanite),
                            humidite:willUpdate(parseFloat(humidite)||null,analyse.humidite),
                            gg:willUpdate(parseFloat(gg)||null,analyse.gg),
                            sel:willUpdate(parseFloat(sel)||null,analyse.sel),

                            silicate:willUpdate(parseFloat(silicate)|| null,analyse.silicate),
                            compression:willUpdate(parseFloat(compression)|| null,analyse.compression),

                            percarbonate:willUpdate(parseFloat(percarbonate)||null,analyse.percarbonate),

                            mousses:willUpdate(mousses,analyse.mousses),
                            observations:analyse.observations+" & "+observations,// willUpdate(observations,analyse.observations),
                            // UtilisateurId:analyse.UtilisateurId
                        },
                        {
                            where:{
                                id:id
                            },
                            returning: true, // 👈 Obligatoire pour PostgreSQL
                            plain: true 
                        }) 
                .then(function(analyseUpdated){
                // io.emit("analysePoudreUpdated", analyseUpdated[1]); // Emit l'analyse mise à jour
                models.Action.create({
                    action:"a mis à jour l'analyse "+id,
                    UtilisateurId:parseInt(UtilisateurId)
                })    
                })
                .then(function(){
                            if(observations!=='RAS'){
                                models.ValidationPoudre.findOne(
                                    {
                                        where:{AnalyseId:id},
                                        attributes:['id','ok','validation']
                                    }
                                )
                                .then(function(foundValidation){
                                    if(foundValidation){
                                        return foundValidation.validation!=='Isolated' && models.ValidationPoudre.update({
                                            ok:false,
                                            validation:"",
                                            UtilisateurId:UtilisateurId
                                            },
                                            {
                                                where:{id:foundValidation.id}
                                            }
                                        )

                                    }else{
                                        return models.ValidationPoudre.create({
                                            ok:false,
                                            validation:"",
                                            UtilisateurId:UtilisateurId,
                                            AnalyseId:analyse.id,
                                        })

                                    }
                                })
                        }
                    })
                .then(function(){
                    const analyses=allAnalyses(req,res)
                    return analyses;
                    })
                .then(function(analyses){
                            return res.status(200).json({
                                "id":id,
                                "analyses":analyses,
                                "code":"green",//✅
                                'message':"Analyse for id="+id+" updated !"
                            })
                        })
                .catch(function(error){
                            return res.status(500).json({
                                "code":"red",//🔴
                                "message":error.message})
                    })
            }else{
                        return res.status(409).json({
                            "code":"red",//🔴
                            "message":"Analyse not found !"
                            })
            }
        }) 
    },
    updateTour:function(req,res){
                var id=parseFloat(req.params.id);
                const { 
                    nChar,
                    densite,
                    observations,
                    UtilisateurId
                }=req.body;
    
            if(UtilisateurId==null){
                    return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
            }

                models.AnalysePoudre.findOne({
                    attributes:[
                                    "nChar",
                                    "densite",
                                    "observations"
                                ],
                    where:{id:id}
                })
                .then(function(analyse){
                    if(analyse){
                        models.AnalysePoudre.update(
                        {
                            nChar:parseFloat(nChar),
                            densite:parseInt(densite),
                            observations:analyse.observations+" & "+observations,// willUpdate(observations,analyse.observations),
                            // UtilisateurId:analyse.UtilisateurId
                        },
                        {
                            where:{
                                id:id
                            }
                        }) 
                .then(function(){
                models.Action.create({
                    action:"a mis à jour la densite de l'analyse "+id,
                    UtilisateurId:parseInt(UtilisateurId)
                })    
                })
                .then(function(){
                            if(observations!=='RAS'){
                                models.ValidationPoudre.findOne(
                                    {
                                        where:{AnalyseId:id},
                                        attributes:['id','ok','validation']
                                    }
                                )
                                .then(function(foundValidation){
                                    if(foundValidation){
                                        return foundValidation.validation!=='Isolated' && models.ValidationPoudre.update({
                                            ok:false,
                                            validation:"",
                                            UtilisateurId:UtilisateurId
                                            },
                                            {
                                                where:{id:foundValidation.id}
                                            }
                                        )

                                    }else{
                                        return models.ValidationPoudre.create({
                                            ok:false,
                                            validation:"",
                                            UtilisateurId:UtilisateurId,
                                            AnalyseId:analyse.id,
                                        })

                                    }
                                })
                        }
                    })
                .then(function(){
                    const analyses=allAnalyses(req,res)
                    return analyses;
                    })
                .then(function(analyses){
                            // io.emit("analyseUpdated", analyse);
                            return res.status(200).json({
                                "id":id,
                                "analyses":analyses,
                                "code":"green",//✅
                                'message':"Analyse for id="+id+" updated !"
                            })
                        })
                .catch(function(error){
                            return res.status(500).json({
                                "code":"red",//🔴
                                "message":error.message})
                    })
            }else{
                        return res.status(409).json({
                            "code":"red",//🔴
                            "message":"Analyse not found !"
                            })
            }
        }) 
    },
    updateChariot:function(req,res){
                var id=parseFloat(req.params.id);
                const { 
                    nChar,
                    UtilisateurId
                }=req.body;
    
            if(UtilisateurId==null){
                    return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
            }

                models.AnalysePoudre.findOne({
                    attributes:[
                                    "nChar"
                                ],
                    where:{id:id}
                })
                .then(function(analyse){
                    if(analyse){
                        models.AnalysePoudre.update(
                        {
                            nChar:parseFloat(nChar)
                            // UtilisateurId:analyse.UtilisateurId
                        },
                        {
                            where:{
                                id:id
                            }
                        }) 
                .then(function(){
                models.Action.create({
                    action:"a mis à jour le numero de chariot de l'analyse "+id,
                    UtilisateurId:parseInt(UtilisateurId)
                })    
                })
                .then(function(){
                    const analyses=allAnalyses(req,res)
                    return analyses;
                    })
                .then(function(analyses){
                            // io.emit("analyseUpdated", analyse);
                            return res.status(200).json({
                                "id":id,
                                "analyses":analyses,
                                "code":"green",//✅
                                'message':"Analyse for id="+id+" updated !"
                            })
                        })
                .catch(function(error){
                            return res.status(500).json({
                                "code":"red",//🔴
                                "message":error.message})
                    })
            }else{
                        return res.status(409).json({
                            "code":"red",//🔴
                            "message":"Analyse not found !"
                            })
            }
        }) 
    },

    // ================== DELETE ==============================
    delete:function(req,res){
            var id=parseInt(req.params.id);
            var userId=req.params.userId;

            if(isNaN(parseInt(id))){
                return res.status(402).json({"code":"red","message":"Id invalide !"})
            }

            models.AnalysePoudre.findOne({
                where:{id:id}
            })
            .then(function(analyseFound){
                if(analyseFound){
                    models.AnalysePoudre.destroy({
                        where:{id:id}
                    })
                    .then(function(deletedAnalyse){
                    // io.emit("analyseDeleted",deletedAnalyse);
                    models.Action.create({
                        action:"a supprimé l'analyse poudre "+id,
                        UtilisateurId:userId
                    })    
                    })
                    .then(function(){
                        const analyses=allAnalyses(req,res);
                        return analyses;
                    })
                    .then(function(analyses){
                        return res.status(200).json({
                            "code":"yellow",
                            "analyses":analyses,
                            "message":"L'analyse "+id+" deleted !"
                        })
                    })
                    .catch(function(error){
                        res.status(400).json({
                            "code":"red",
                            "message":"Impossible de supprimer cette analyse ! :"+error.message
                        })
                    })
                }else{
                    return res.status(404).json({"code":"yellow","message":"Analyse introuvable !"})
                }
            })
            .catch(function(){
                return res.status(404).json({
                    "code":"yellow",
                    "message":"Analyse introuvable"
                })
            })
        },

    // ================== GET =================================
    all:async (req, res) => {
        const startedAt= req.query.startedAt || startedAtDefault;
        const endedAt= req.query.endedAt || endedAtDefault;
        const {startDate,endDate}=dates(startedAt,endedAt);
          try {
            const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
            const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
            const offset = (page - 1) * limit; // Calcul de l’offset
            // Récupération des données
            const { rows, count } = await models.AnalysePoudre.findAndCountAll({
                where: {
                    createdAt: {[Op.between]: [startDate, endDate]}
                },
                attributes:attributes,
                include:includes,
                distinct:true,
                limit:limit,
                offset:offset,
                order: [['createdAt', 'ASC']], // Trier du plus récent au plus ancien
            });
            res.status(200).json({
              totalAnalyses: count,
              totalPages: Math.ceil(count / limit),
              currentPage: page,
              analyses: rows,
            });
          } catch (error) {
            return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
        }
        },

        extra:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.AnalysePoudre.findAndCountAll({
                  where:{
                    categorie:"extra",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:attributes,
                  include:includes,
                  distinct:true,
                  limit:limit,
                  offset:offset,
                  order: [['name', 'DESC']], // Trier du plus récent au plus ancien
              });
              res.status(200).json({
                totalAnalyses: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                analyses: rows,
              });
            } catch (error) {
              return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
          }
          },

        local:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.AnalysePoudre.findAndCountAll({
                  where:{categorie:"local",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:attributes,
                  include:includes,
                distinct:true,
                  limit:limit,
                  offset:offset,
                  order: [['name', 'ASC'],['createdAt', 'ASC']], // Trier du plus récent au plus ancien
              });
              res.status(200).json({
                totalAnalyses: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                analyses: rows,
              });
            } catch (error) {
              return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
          }
          },

        get:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.AnalysePoudre.findAndCountAll({
                  where:{categorie:"get",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id",
                                "nChar",
                                "name",
                                "taches",
                                "parfum",
                                "type",
                                "categorie",
                                "lansa",
                                "format",
                                "matiere_active",
                                "alcanite",
                                "humidite",
                                "gg",
                                "silicate",
                                "sel",
                                "densite",
                                "compression",
                                "percarbonate",
                                "mousses",
                                "observations",
                                "createdAt",
                                "updatedAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.CommentairePoudre,
                          as:'commentaires',
                          attributes:['id','text','AnalyseId','createdAt'],
                          include:[
                             { 
                                  model:models.Utilisateur,
                                  attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                              }
                          ]
                      },
                      {
                          model: models.ValidationPoudre,
                          as: "validation",
                          include: [
                                  {
                                      model: models.Utilisateur,
                                      as:'Utilisateur',
                                      attributes:['id','fName','lName','pseudo','tel','url','isAdmin'],
                                  },
                              ],
                          attributes:['id','ok','validation','createdAt','updatedAt'],
                        }
                  ],
                  distinct:true,
                  limit:limit,
                  offset:offset,
                  order: [['name', 'ASC'],['createdAt', 'ASC']], // Trier du plus récent au plus ancien
              });
              res.status(200).json({
                totalAnalyses: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                analyses: rows,
              });
            } catch (error) {
              return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
          }
          },

        diam:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.AnalysePoudre.findAndCountAll({
                // | emuls | sapo | alcool | heure | masse | ratio | volume |  categorie
                  where:{categorie:"diam",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id",
                                "nChar",
                                "name",
                                "taches",
                                "parfum",
                                "type",
                                "categorie",
                                "lansa",
                                "format",
                                "matiere_active",
                                "alcanite",
                                "humidite",
                                "gg",
                                "silicate",
                                "sel",
                                "densite",
                                "compression",
                                "percarbonate",
                                "mousses",
                                "observations",
                                "createdAt",
                                "updatedAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.CommentairePoudre,
                          as:'commentaires',
                          attributes:['id','text','AnalyseId','createdAt'],
                          include:[
                             {
                                  model:models.Utilisateur,
                                  attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                              }
                          ]
                      },
                      {
                          model: models.ValidationPoudre,
                          as: "validation",
                          include: [
                                  {
                                      model: models.Utilisateur,
                                      as:'Utilisateur',
                                      attributes:['id','fName','lName','pseudo','tel','url','isAdmin'],
                                  },
                              ],
                          attributes:['id','ok','validation','createdAt','updatedAt'],
                        }
                  ],
                  distinct:true,
                  limit:limit,
                  offset:offset,
                  order: [['name', 'ASC'],['createdAt', 'ASC']], // Trier du plus récent au plus ancien
              });
              res.status(200).json({
                totalAnalyses: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                analyses: rows,
              });
            } catch (error) {
              return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
          }
          },

        auto:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.AnalysePoudre.findAndCountAll({
                  where:{categorie:"auto",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id",
                                "nChar",
                                "name",
                                "taches",
                                "parfum",
                                "type",
                                "categorie",
                                "lansa",
                                "format",
                                "matiere_active",
                                "alcanite",
                                "humidite",
                                "gg",
                                "silicate",
                                "sel",
                                "densite",
                                "compression",
                                "percarbonate",
                                "mousses",
                                "observations",
                                "createdAt",
                                "updatedAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.CommentairePoudre,
                          as:'commentaires',
                          attributes:['id','text','AnalyseId','createdAt'],
                          include:[
                             { 
                                  model:models.Utilisateur,
                                  attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                              }
                          ]
                      },
                      {
                          model: models.ValidationPoudre,
                          as: "validation",
                          include: [
                                  {
                                      model: models.Utilisateur,
                                      as:'Utilisateur',
                                      attributes:['id','fName','lName','pseudo','tel','url','isAdmin'],
                                  },
                              ],
                          attributes:['id','ok','validation','createdAt','updatedAt'],
                        }
                  ],
                  distinct:true,
                  limit:limit,
                  offset:offset,
                  order: [['name', 'ASC'],['createdAt', 'ASC']], // Trier du plus récent au plus ancien
              });
              res.status(200).json({
                totalAnalyses: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                analyses: rows,
              });
            } catch (error) {
              return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
          }
          },

        lansas:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.AnalysePoudre.findAndCountAll({
                  where:{type:"lansa",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id",
                                "nChar",
                                "name",
                                "taches",
                                "parfum",
                                "type",
                                "categorie",
                                "lansa",
                                "format",
                                "matiere_active",
                                "alcanite",
                                "humidite",
                                "gg",
                                "silicate",
                                "sel",
                                "densite",
                                "compression",
                                "percarbonate",
                                "mousses",
                                "observations",
                                "createdAt",
                                "updatedAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.CommentairePoudre,
                          as:'commentaires',
                          attributes:['id','text','AnalyseId','createdAt'],
                          include:[
                             { 
                                  model:models.Utilisateur,
                                  attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                              }
                          ]
                      },
                      {
                          model: models.ValidationPoudre,
                          as: "validation",
                          include: [
                                  {
                                      model: models.Utilisateur,
                                      as:'Utilisateur',
                                      attributes:['id','fName','lName','pseudo','tel','url','isAdmin'],
                                  },
                              ],
                          attributes:['id','ok','validation','createdAt','updatedAt'],
                        }
                  ],
                  distinct:true,
                  limit:limit,
                  offset:offset,
                  order: [['name', 'ASC'],['createdAt', 'ASC']], // Trier du plus récent au plus ancien
              });
              res.status(200).json({
                totalAnalyses: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                analyses: rows,
              });
            } catch (error) {
              return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
          }
          },
          
        formules:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.AnalysePoudre.findAndCountAll({
                  where:{type:"fini",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id",
                                "nChar",
                                "name",
                                "taches",
                                "parfum",
                                "type",
                                "categorie",
                                "lansa",
                                "format",
                                "matiere_active",
                                "alcanite",
                                "humidite",
                                "gg",
                                "silicate",
                                "sel",
                                "densite",
                                "compression",
                                "percarbonate",
                                "mousses",
                                "observations",
                                "createdAt",
                                "updatedAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.CommentairePoudre,
                          as:'commentaires',
                          attributes:['id','text','AnalyseId','createdAt'],
                          include:[
                             { 
                                  model:models.Utilisateur,
                                  attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                              }
                          ]
                      },
                      {
                          model: models.ValidationPoudre,
                          as: "validation",
                          include: [
                                  {
                                      model: models.Utilisateur,
                                      as:'Utilisateur',
                                      attributes:['id','fName','lName','pseudo','tel','url','isAdmin'],
                                  },
                              ],
                          attributes:['id','ok','validation','createdAt','updatedAt'],
                        }
                  ],
                  distinct:true,
                  limit:limit,
                  offset:offset,
                  order: [['name', 'ASC'],['createdAt', 'ASC']], // Trier du plus récent au plus ancien
              });
              res.status(200).json({
                totalAnalyses: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                analyses: rows,
              });
            } catch (error) {
              return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
          }
          },
        lansasAndFormules:async (req, res)=>{
            try{
            const lansasAndFormules=await allAnalyses(req, res);
            // const lansas=await lansasAndFormules.filter(analyse=>analyse.type==="lansa");
            // const formules=await lansasAndFormules.filter(analyse=>analyse.type==="fini");
            return res.status(200).json({code:"green",analyses:lansasAndFormules});
            } catch (error) {
              return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
          }
        },
        One:function(req,res){
            // req.params. => root/param
            var id=req.params.id;
            var name=req.query.name; //req.query =>  root?param=valueOfParam
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);

            models.AnalysePoudre.findOne({
                where:{
                    id:id,
                    name:name,
                    createdAt: {[Op.between]: [startDate, endDate]}
                },
                attributes:["id",
                                    "nChar",
                                    "name",
                                    "taches",
                                    "parfum",
                                    "type",
                                    "categorie",
                                    "lansa",
                                    "format",
                                    "matiere_active",
                                    "alcanite",
                                    "humidite",
                                    "gg",
                                    "silicate",
                                    "sel",
                                    "densite",
                                    "compression",
                                    "percarbonate",
                                    "mousses",
                                    "observations",
                                    "createdAt",
                                    "updatedAt"
                                ],
                include:[
                    {
                        model:models.Utilisateur,
                        as:'Utilisateur',
                        attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                    },
                    {
                        model:models.ValidationPoudre,
                        as:'validation',
                        attributes:['id','ok','validation','createdAt','updatedAt'],
                        include:[
                            {
                                model:models.Utilisateur,
                                as:'Utilisateur',
                                attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                            }
                        ]
                    }
                ]
            })
            .then(function(analyseFound){
                if(analyseFound){
                    return res.status(200).json(analyseFound);
                }else{
                    return res.status(404).json({"code":"yellow","message":"ressource introuvable !"})
                }
            })
            .catch(function(error){
                return res.status(500).json({"code":"red","message":"impossible de charger la ressource ! "+error.message})
            })
        }
}