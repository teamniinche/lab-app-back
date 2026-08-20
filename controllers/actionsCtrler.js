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
// const sendToWhatsApp=require('../whatsapp').sendToWhatsApp
const startedAtDefault='2025-04-01';
const endedAtDefault='2100-12-31'

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

var io; // Instance de socket.io

// Fonction pour initialiser socket.io
module.exports.setSocketIo = function (socketIoInstance) {
  io = socketIoInstance;
};

module.exports.actionsCtrler={
    add:function(req,res){
    //params
    const {action,UtilisateurId}=req.body;

    if(UtilisateurId==null){
        return res.status(400).json({"code":"red","message":"Identifiant utilisateur est requis !"});
    }
    // var newId;var nwAnalyse;
    const newAction={
            action:action,
            UtilisateurId:UtilisateurId
        }
    models.Action.create(newAction)
        .then(function(createdAction){
            // io.emit("analyseAdded", createdAnalyse);
            return res.status(201).json({
                "id":createdAction.id,
                "code":"green",
                "message":"Action "+createdAction.id+" created"
            })
        })
        .catch(function(error){
            return res.status(500).json({"code":"red","message":"impossible d'enregistrer cette action ! "+error.message})
        })
    },
    all:async (req, res) => {
        const startedAt= req.query.startedAt || startedAtDefault;
        const endedAt= req.query.endedAt || endedAtDefault;
        const {startDate,endDate}=dates(startedAt,endedAt);
          try {
            const page = parseInt(req.query.page) || 1; // Page actuelle (défaut : 1)
            const limit = parseInt(req.query.limit) || 15; // Nombre d'éléments par page (défaut : 10)
            const offset = (page - 1) * limit; // Calcul de l’offset
            // Récupération des données
            const { rows, count } = await models.Action.findAndCountAll({
                where: {
                    createdAt: {[Op.between]: [startDate, endDate]}
                },
                attributes:["id","action","createdAt"],
                include:[
                    {
                        model:models.Utilisateur,
                        attributes:['fName','lName','pseudo','niv','tel']
                    }
                ],
                distinct:true,
                order: [['createdAt', 'DESC']], // Trier du plus récent au plus ancien
                limit:limit,
                offset:offset,
            });
            res.status(200).json({
              totalActions: count,
              totalPages: Math.ceil(count / limit),
              currentPage: page,
              actions: rows,
            });
          } catch (error) {
            return res.status(404).json({"code":"red","message":"Impossible de charger les actions ! : "+error.message})
        }
        },

    delete:function(req,res){
        var id=req.params.id;

        if(isNaN(parseInt(id))){
            return res.status(402).json({"code":"red","message":"Id invalide !"})
        }

        models.Action.findOne({
            where:{id:id}
        })
        .then(function(actionFound){
            if(actionFound){
                models.Action.destroy({
                    where:{id:id}
                })
                .then(function(){
                    // io.emit("analyseDeleted",analyseFound);
                    return res.status(203).json({
                        "code":"yellow",
                        "message":"L'action "+id+" supprimee !"
                    })
                })
                .catch(function(){
                    res.status(400).json({
                        "code":"red",
                        "message":"Impossible de supprimer cette action !"
                    })
                })
            }else{
                return res.status(404).json({"code":"yellow","message":"Action introuvable !"})
            }
        })
        .catch(function(){
            return res.status(404).json({
                "code":"yellow",
                "message":"Action introuvable"
            })
        })
    },
}