// const expressForSocket=require('express');
// const socketIo=require('socket.io');
// const http=require('http');
/*
    Colonne     |           Type           | Collationnement | NULL-able |              Par defaut
----------------+--------------------------+-----------------+-----------+--------------------------------------
 id             | integer                  |                 | not null  | nextval('analyses_id_seq'::regclass)
 machine        | character varying(255)   |                 |           |
 name           | character varying(255)   |                 |           |
 reservoir      | integer                  |                 |           |
 ph             | double precision         |                 |           |
 color          | character varying(255)   |                 |           | NULL::character varying
 parfum         | character varying(255)   |                 |           | NULL::character varying
 matiere_active | double precision         |                 |           |
 viscosite      | integer                  |                 |           |
 densite        | double precision         |                 |           |
 caustique      | double precision         |                 |           |
 silicate       | double precision         |                 |           |
 durete         | integer                  |                 |           |
 tds            | integer                  |                 |           |
 observations   | character varying(255)   |                 |           | 'RAS'::character varying
 UtilisateurId  | integer                  |                 | not null  |
 createdAt      | timestamp with time zone |                 | not null  | CURRENT_TIMESTAMP
 updatedAt      | timestamp with time zone |                 | not null  | CURRENT_TIMESTAMP
*/

/*
 var machine=req.body.machine || null;
 var name=req.body.name || null;
 var reservoir=req.body.reservoir || null;
 var ph=req.body.ph || null;
 var color=req.body.color || null;
 var parfum=req.body.parfum || null;
 var matiere_active=req.body.matiere_active || null;
 var viscosite=req.body.viscosite || null;
 var densite=req.body.densite || null;
 var caustique=req.body.caustique || null;
 var silicate=req.body.silicate || null;
 var durete=req.body || null;
 var tds=req.body || null;
 var observations=req.body || null;
 var UtilisateurId=req.body || null;
*/
/*
[
    {
        "machine": "B",
        "name": "Renzo citron",
        "reservoir": 32,
        "ph": 7.8,
        "color": "C",
        "parfum": "C",
        "matiere_active": 16.16,
        "viscosite": 550,
        "densite": 1.31,
        "caustique": 47.23,
        "silicate": 45.03,
        "durete": 120,
        "tds": 212,
        "observations": "RASS",
        "Utilisateur": {
            "id": 1,
            "fName": "Mamadou",
            "lName": "Ndour",
            "tel": "771528620",
            "isAdmin": true
        }
    }
]
*/
var models=require('../models');
const { Op } = require("sequelize");
const sendToWhatsApp=require('../whatsapp').sendToWhatsApp
const {validationCtrler}=require("./validationCtrler");
const startedAtDefault='2025-04-01';
const endedAtDefault='2100-12-31'

const attributes=["id","machine","name","reservoir","ph","color","parfum",
                "matiere_active","viscosite","densite","caustique",
                "silicate","durete","tds","categorie","observations","updatedAt","createdAt"];
const includes=[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.Commentaire,
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
                          model: models.Validation,
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

// const results = await Model.findAll({
  
// });

// var io; // Instance de socket.io

// Fonction pour initialiser socket.io
// module.exports.setSocketIo = function (socketIoInstance) {
//   io = socketIoInstance;
// };

function willUpdate(term1,term2){
    var term;
    var term02=term2===undefined?null:term2;
    if(term1!==null && term1!=="" && term1!==undefined){term=term1;
    }else{term=term02;}

    return term;
}

module.exports.analyseCtrler={
    
    allAnalyses:async function(req, res){
        const startedAt= req.query.startedAt || startedAtDefault;
        const endedAt= req.query.endedAt || endedAtDefault;
        const {startDate,endDate}=dates(startedAt,endedAt);
          try {
            const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
            const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
            const offset = (page - 1) * limit; // Calcul de l’offset
            // Récupération des données
            const { rows, count } = await models.Analyse.findAndCountAll({
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
            return {
                message: "Analyses chargées avec succès !",
                totalAnalyses: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                analyses: rows,
            };
          } catch (error) {
            return {
                message: "Erreur lors du chargement des analyses !",
                totalAnalyses: 0,
                totalPages: 0,
                currentPage: 1,
                analyses: [], 
            };
        }
        },
        getAnalyse:async function(req,res){
                var id=req?.params?.id;
                const analyse=models.Analyse.findOne({
                    where:{id:id},
                    attributes:attributes,
                    include:includes
                })
                .then(function(analyseFound){
                    if(analyseFound){
                        return {ok:false,analyse:analyseFound}
    
                    }else{
                        return {ok:false,message:"ressource introuvable !",analyse:{}}
                    }
                })
                .catch(function(error){
                    return {ok:false,message:"impossible de charger la ressource ! ",analyse:{}}
                })
    
                return {ok:analyse.ok,message:analyse.message,analyse:analyse.analyse,commentaires:analyse.commentaires};
            },
    add:function(req,res){
    //params
    const {
        machine,name,reservoir,ph,color,parfum,
        matiere_active,viscosite,densite,emuls,sapo,masse,volume,caustique,
        ratio,silicate,durete,tds,categorie,observations,UtilisateurId
     }=req.body;

    if(UtilisateurId==null){
        return res.status(400).json({"code":"red","message":"Nom du chimiste est requis !"});
    }
    // var newId;var nwAnalyse;
    const newAnalyse={
            machine:machine,
            name:name,
            reservoir:reservoir,
            ph:ph,
            color:color,
            parfum:parfum,
            matiere_active:matiere_active,
            viscosite:viscosite,
            densite:densite,
            caustique:caustique,
            silicate:silicate,
            durete:durete,
            tds:tds,
            categorie:categorie,
            observations:observations,
            UtilisateurId:UtilisateurId
        }
    models.Analyse.create(newAnalyse)
        .then(function(createdAnalyse){
            if(createdAnalyse.observations!=="RAS"){
                return models.Validation.create({
                            ok:false,
                            validation:"",
                            UtilisateurId:UtilisateurId,
                            AnalyseId:createdAnalyse.id,
                        }).then(() => createdAnalyse); // ✨ ASTUCE : On fait suivre l'analyse originale !
            }
            return createdAnalyse;
        })
        .then(function(createdAnalyse){
            return res.status(201).json({
                "id":createdAnalyse.id,
                "code":"green",
                "message":"Analyse "+createdAnalyse.id+" saved"
            })
        })
        .catch(function(error){
            return res.status(500).json({"code":"red","message":"impossible d'enregistrer cette analyse ! "+error.message})
        })
    },
    all:async (req, res) => {
        const startedAt= req.query.startedAt || startedAtDefault;
        const endedAt= req.query.endedAt || endedAtDefault;
        const {startDate,endDate}=dates(startedAt,endedAt);
          try {
            const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
            const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
            const offset = (page - 1) * limit; // Calcul de l’offset
            // Récupération des données
            const { rows, count } = await models.Analyse.findAndCountAll({
                where: {
                    createdAt: {[Op.between]: [startDate, endDate]}
                    // [Op.or]: [
                    //     {createdAt: {[Op.gte]: startDate}},
                    //     {createdAt: {[Op.lt]: endDate}},
                    //     {createdAt: {[Op.between]: [startDate, endDate]}}
                    // ]
                },
                attributes:["id","machine","name","reservoir","ph","color","parfum",
                "matiere_active","viscosite","densite","caustique",
                "silicate","durete","tds","categorie","observations","updatedAt","createdAt"],
                include:[
                    {
                        model:models.Utilisateur,
                        attributes:['id','fName','lName','pseudo','tel','isAdmin']
                    },
                    {
                        model:models.Commentaire,
                        as:'commentaires',
                        attributes:['id','text','AnalyseId','createdAt'],
                        include:[
                            {
                                model:models.Utilisateur,
                                attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                            }
                        ],
                        distinct:true,
                    },
                    {
                        model: models.Validation,
                        as: "validation",
                        include: [
                                {
                                    model: models.Utilisateur,
                                    as:'Utilisateur',
                                    attributes:['id','fName','lName','pseudo','tel','url','isAdmin'],
                                },
                            ],
                        distinct:true,
                        attributes:['id','ok','validation','createdAt','updatedAt'],
                      }
                ],
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

    multiusages:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.Analyse.findAndCountAll({
                  where:{
                    categorie:"liquides vaisselle",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id","machine","name","reservoir","ph","color","parfum",
                  "matiere_active","viscosite","categorie","observations","updatedAt","createdAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.Commentaire,
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
                          model: models.Validation,
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
                  ],
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

        cosmetiques:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.Analyse.findAndCountAll({
                  where:{categorie:"cosmetique",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id","machine","name","reservoir","ph","color","parfum","alcool","sapo","emuls",
                  "matiere_active","viscosite","categorie","observations","updatedAt","createdAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.Commentaire,
                          as:'commentaires',
                          attributes:['id','text','AnalyseId','createdAt'],
                          include:[
                             { 
                                  model:models.Utilisateur,
                                  attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                              }
                          ],
                          distinct:true,
                      },
                      {
                          model: models.Validation,
                          as: "validation",
                          include: [
                                  {
                                      model: models.Utilisateur,
                                      as:'Utilisateur',
                                      attributes:['id','fName','lName','pseudo','tel','url','isAdmin'],
                                  },
                              ],
                            distinct:true,
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

        pates:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.Analyse.findAndCountAll({
                  where:{categorie:"dentifrice",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id","name","ph","viscosite","densite","categorie","observations","updatedAt","createdAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.Commentaire,
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
                          model: models.Validation,
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

        causilicate:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.Analyse.findAndCountAll({
                // | emuls | sapo | alcool | heure | masse | ratio | volume |  categorie
                  where:{categorie:"causilicate",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id","heure","name","masse","volume","caustique","ratio",
                  "silicate","categorie","observations","updatedAt","createdAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.Commentaire,
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
                          model: models.Validation,
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

        eaux:async (req, res) => {
            const startedAt= req.query.startedAt || startedAtDefault;
            const endedAt= req.query.endedAt || endedAtDefault;
            const {startDate,endDate}=dates(startedAt,endedAt);
            try {
              const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
              const limit = parseInt(req.query.limit) || 10; // Nombre d'éléments par page (défaut : 10)
              const offset = (page - 1) * limit; // Calcul de l’offset
              // Récupération des données
              const { rows, count } = await models.Analyse.findAndCountAll({
                  where:{categorie:"eaux",
                    createdAt: {[Op.between]: [startDate, endDate]}
                    },
                  attributes:["id","name","durete","tds","categorie","observations","updatedAt","createdAt"],
                  include:[
                      {
                          model:models.Utilisateur,
                          attributes:['id','fName','lName','pseudo','tel','isAdmin']
                      },
                      {
                          model:models.Commentaire,
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
                          model: models.Validation,
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



    //     models.Analyse.findAll({
    //         attributes:["id","machine","name","reservoir","ph","color","parfum",
    //             "matiere_active","viscosite","densite","caustique",
    //             "silicate","durete","tds","observations","updatedAt","createdAt"],
    //         include:[
    //             {
    //                 model:models.Utilisateur,
    //                 attributes:['id','fName','lName','tel','isAdmin']
    //             }
    //         ]
    //     })
    //     .then(function(analyses){
    //         if(analyses){
    //             return res.status(200).json(analyses)
    //         }else{
    //             return res.status(404).json({"code":"red","message":"Aucune analyse trouvée !"})
    //         }
    //     })
    //     .catch(function(error){
    //         return res.status(404).json({"code":"red","message":"Impossible de charger les analyses ! : "+error.message})
    //     })
    // },
    One:function(req,res){
        var id=req.params.id;
        models.Analyse.findOne({
            where:{id:id},
            attributes:["id","machine","name","reservoir","ph","color","parfum",
                "matiere_active","viscosite","densite","caustique",
                "silicate","durete","tds","observations","updatedAt","createdAt"],
            include:[
                {
                    model:models.Utilisateur,
                    as:'Utilisateur',
                    attributes:['id','fName','lName','pseudo','tel','url','isAdmin']
                },
                {
                    model:models.Validation,
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
                //     {
                //     id:analyseFound.id,
                //     name:donFound.name,
                //     machine:analyseFound.machine,
                //     reservoir:analyseFound.reservoir,
                //     ph:analyseFound.ph,
                //     color:analyseFound.color,
                //     parfum:analyseFound.parfum,
                //     viscosite:analyseFound.viscosite,
                //     matiere_active:analyseFound.matiere_active,
                //     densite:analyseFound.densite,
                //     caustique:analyseFound.caustique,
                //     silicate:analyseFound.silicate,
                //     durete:analyseFound.durete,
                //     tds:analyseFound.tds,
                //     observations:analyseFound.observations,
                //     UtilisateurId:analyseFound.UtilisateurId//donFound.localityId
                // })
            }else{
                return res.status(404).json({"code":"yellow","message":"ressource introuvable !"})
            }
        })
        .catch(function(error){
            return res.status(500).json({"code":"red","message":"impossible de charger la ressource ! "+error.message})
        })
    },
    update:function(req,res){
            var id=req.params.id;
            const { 
                machine,name,reservoir,ph,color,parfum,
                matiere_active,viscosite,densite,caustique,
                silicate,durete,tds,observations,UtilisateurId
             }=req.body;
   
            if(UtilisateurId==null){
                return res.status(400).json({"code":"red","message":"il manque des paramètres necessaires ! "});
            }
            if(isNaN(id)){return res.status(400).json({"code":"red","message":"L'ID est nul ou indéfini ! "});}

            models.Analyse.findOne({
                attributes:['machine','name','reservoir','ph','color','parfum',
                    'matiere_active','viscosite','densite','caustique',
                    'silicate','durete','tds','observations','UtilisateurId'],
                where:{id:id}
            })
            .then(function(analyse){
                if(analyse){
                    // const { 
                    //     machine,name,reservoir,ph,color,parfum,
                    //     matiere_active,viscosite,densite,caustique,
                    //     silicate,durete,tds,observations,UtilisateurId
                    //  }=analyse;
                    models.Analyse.update(
                    {
                        machine:willUpdate(machine,analyse.machine),
                        name:willUpdate(name,analyse.name),
                        reservoir:willUpdate(reservoir,analyse.reservoir),
                        ph:willUpdate(ph,analyse.ph),
                        color:willUpdate(color,analyse.color),
                        parfum:willUpdate(parfum,analyse.parfum),
                        matiere_active:willUpdate(matiere_active,analyse.matiere_active),
                        viscosite:willUpdate(viscosite,analyse.viscosite),
                        densite:willUpdate(densite,analyse.densite),
                        caustique:willUpdate(caustique,analyse.caustique),
                        silicate:willUpdate(silicate,analyse.silicate),
                        durete:willUpdate(durete,analyse.durete),
                        tds:willUpdate(tds,analyse.tds),
                        observations:analyse.observations+" & "+observations,// willUpdate(observations,analyse.observations),
                        UtilisateurId:analyse.UtilisateurId
                    },
                    {
                        where:{
                            id:id
                        }
                    })
                    .then(function(){
                        if(observations!=='RAS'){
                            models.Validation.findOne(
                                {
                                    where:{AnalyseId:id},
                                    attributes:['id','ok','validation']
                                }
                            )
                            .then(function(foundValidation){
                                if(foundValidation){
                                    return foundValidation.validation!=='Isolated' && models.Validation.update({
                                        ok:false,
                                        validation:"",
                                        UtilisateurId:UtilisateurId,
                                        AnalyseId:analyse.id,
                                        },
                                        {
                                            where:{id:foundValidation.id}
                                        }
                                    )

                                }else{
                                    return models.Validation.create({
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
                    Action.create({
                        action:"a mis à jour l'analyse "+id,
                        UtilisateurId:UtilisateurId
                    })    
                    })
                    .then(function(){
                        // io.emit("analyseUpdated", analyse);
                        return res.status(202).json({
                            "id":id,
                            "code":"green",//✅
                            'message':"Analyse "+id+" updated !"
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
    delete:function(req,res){
        var id=req.params.id;
        var userId=req.params.userId

        if(isNaN(parseInt(id))){
            return res.status(402).json({"code":"red","message":"Id invalide !"})
        }

        models.Analyse.findOne({
            where:{id:id}
        })
        .then(function(analyseFound){
            if(analyseFound){
                models.Analyse.destroy({
                    where:{id:id}
                })
                
                .then(function(){
                models.Action.create({
                    action:"a supprimé l'analyse liquide "+id,
                    UtilisateurId:userId
                })    
                })
                .then(function(){
                    // io.emit("analyseDeleted",analyseFound);
                    return res.status(203).json({
                        "code":"yellow",
                        "message":"L'analyse "+id+" deleted !"
                    })
                })
                .catch(function(){
                    res.status(400).json({
                        "code":"red",
                        "message":"Impossible de supprimer cette analyse !"
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
}

// models.Analyse.create(newAnalyse)
// .then(function (createdAnalyse) {
//     newId = createdAnalyse.id;
//     nwAnalyse = createdAnalyse;

//     // Si observations === "RASS", on ajoute une validation et retourne sa promesse
//     if (createdAnalyse.observations === "RASS") {
//         return models.Validation.create({
//             ok: false,
//             validation: null,
//             UtilisateurId: UtilisateurId,
//             AnalyseId: newId,
//         }).then(() => createdAnalyse); // On retourne `createdAnalyse` après la validation
//     }

//     return createdAnalyse; // Sinon, on retourne directement l'analyse créée
// })
// .then(function (finalAnalyse) {
//     io.emit("analyseAdded", finalAnalyse);
//     return res.status(201).json({
//         "id": newId,
//         "code": "green",
//         "message": "Analyse " + newId + " saved"
//     });
// })