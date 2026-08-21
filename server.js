/* Les DIFFS

Tout de la team niintche est supprimé

*/
var express=require('express');
var bodyParser=require('body-parser');
const fs = require('fs');
const path = require('path');
var constants=require('./config/constants.js');
var actionRouter=require('./routes/actionRouter.js').router;
var utilisateursRouter=require('./routes/utilisateurRouter.js').router;
var analysesRouter=require('./routes/analyseRouter.js').router;
var commentairesRouter=require('./routes/commentaireRouter.js').router;
var validationsRouter=require('./routes/validationRouter.js').router;
const normesRouter = require('./routes/normesRouter').router;
const {analysePoudreCtrler}= require('./controllers/analysePoudreCtrler.js');
const {analyseCtrler}= require('./controllers/analyseCtrler.js');

var analysesPoudreRouter=require('./routes/analysePoudreRouter.js').router;
var commentairesPoudreRouter=require('./routes/commentairePoudreRouter.js').router;
var validationsPoudreRouter=require('./routes/validationPoudreRouter.js').router;
var normesPoudreRouter = require('./routes/normesPoudreRouter').router;
var normesFormulesPoudreRouter = require('./routes/normesFormulesPoudreRouter').router;

// Passer l'instance de socket.io aux contrôleurs
// var { setSocketIo } = require('./controllers/analyseCtrler.js');
// var {setSocketIoC} = require('./controllers/commentaireCtrler.js');
// var { setSocketIoV } = require('./controllers/validationCtrler.js');
// var { setSocketIoP } = require('./controllers/analysePoudreCtrler.js');
// var {setSocketIoPC} = require('./controllers/commentairePoudreCtrler.js');
// var {setSocketIoU} = require('./controllers/utilisateurCtrler.js');

var cors=require('cors')
var {Server}=require('socket.io');
var http=require('http');
// Port sur lequel s'execute le server
var PORT=process.env.PORT || 8081;
// Intancier express
var server=express();
var sServer=http.createServer(server);
const allowedOrigins = ["http://localhost:80","http://172.28.112.1:80","http://localhost","http://172.28.112.1"]  // Votre propre port API si le client y est hébergé;
const corsOptions={
    // origin: '*', // Permet toutes les origines, mais tu peux restreindre à une origine spécifique
    origin:function (origin, callback) {
            // Autorise les requêtes sans origine (comme Postman ou les pings internes Docker)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error(origin+' Bloqué par la politique CORS : Origine non autorisée.'));
            }
        },
    // allowedOrigins, // Permet toutes les origines, mais tu peux restreindre � une origine sp�cifique
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization','X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200
}
server.use(cors(corsOptions));
server.options('*', cors(corsOptions));
server.use(express.json());
// Middlewears
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

// Routes
server.use('/tn-api-campagne/utilisateurs',utilisateursRouter)
server.use('/tn-api-campagne/analyses',analysesRouter)
server.use('/tn-api-campagne/commentaires',commentairesRouter)
server.use('/tn-api-campagne/validations',validationsRouter)
server.use('/tn-api-campagne/normes', normesRouter)
server.use('/tn-api-campagne/poudre/analyses',analysesPoudreRouter)
server.use('/tn-api-campagne/poudre/commentaires',commentairesPoudreRouter)
server.use('/tn-api-campagne/poudre/validations',validationsPoudreRouter)
server.use('/tn-api-campagne/poudre/normes', normesPoudreRouter)
server.use('/tn-api-campagne/formules/normes', normesFormulesPoudreRouter)
server.use('/tn-api-campagne/actions',actionRouter)

// //======================= NORMES PRODUCTS LIQUIDES ++++++++++++++++++++++++++++++
// server.post('/tn-api-campagne/update-normes', (req, res) => {
//     // const filePath = path.join(__dirname, 'normes.json');
//     const newData = req.body;
//     try {
//         fs.writeFile('normes.json', JSON.stringify(newData, null, 2),()=>{console.log('Normes liquides bien modifié .');});
//         return res.status(200).json({code:"green",data:newData,message: '✅ Normes updated' });
//     } catch (error) {
//         return res.status(500).json({code:"red",data:{},message: '❌ Update fail '+error.message });
//     }
// });
// server.get('/tn-api-campagne/get-normes', (req,res) => {
//     // const filePath = path.join(__dirname, 'normes.json');
//     try {
//         const data = fs.readFileSync('normes.json');
//         const normesJson = JSON.parse(data);
//         return res.status(200).json({code:"green",data:normesJson});
//     } catch (err) {
//         return res.status(500).json({code:"red",data:{},errorMessage:err.message});
//     }
// });

// // ========================== NORMES POUDRE LANSAS ==================================

// server.post('/tn-api-campagne/poudre/update-normesLansas', (req, res) => {
//     // const filePath = path.join(__dirname, 'normes.json');
//     const newData = req.body;
//     try {
//         fs.writeFile('normesPoudre.json', JSON.stringify(newData, null, 2),()=>{console.log('Normes lansas bien modifié .');});
//         return res.status(200).json({code:"green",data:newData,message: '✅ Normes updated' });
//     } catch (error) {
//         return res.status(500).json({code:"red",data:{},message: '❌ Update fail '+error.message });
//     }
// });

// server.get('/tn-api-campagne/poudre/get-normesLansas', (req,res) => {
//     // const filePath = path.join(__dirname, 'normes.json');
//     try {
//         const data = fs.readFileSync('normesPoudre.json');
//         const normesJson = JSON.parse(data);
//         return res.status(200).json({code:"green",data:normesJson});
//     } catch (err) {
//         return res.status(500).json({code:"red",data:{},errorMessage:err.message});
//     }
// });
// server.get('/tn-api-campagne/poudre/get-normes', (req,res) => {
//     try {
//         const lansas = fs.readFileSync('normesPoudre.json');
//         const lansasJson = JSON.parse(lansas);
//         const formules = fs.readFileSync('normesFormules.json');
//         const formulesJson = JSON.parse(formules);
//         return res.status(200).json({code:"green",data:{lansas:lansasJson,formules:formulesJson}});
//     } catch (err) {
//         return res.status(500).json({code:"red",data:{},errorMessage:err.message});
//     }
// });


// // ========================== NORMES FORMULES ==================================

// server.post('/tn-api-campagne/poudre/update-normesFormules', (req, res) => {
//     // const filePath = path.join(__dirname, 'normes.json');
//     const newData = req.body;
//     try {
//         fs.writeFile('normesFormules.json', JSON.stringify(newData, null, 2),()=>{console.log('Normes formules bien modifié .');});
//         return res.status(200).json({code:"green",data:newData,message: '✅ Normes updated' });
//     } catch (error) {
//         return res.status(500).json({code:"red",data:{},message: '❌ Update fail '+error.message });
//     }
// });

// server.get('/tn-api-campagne/poudre/get-normesFormules', (req,res) => {
//     // const filePath = path.join(__dirname, 'normes.json');
//     try {
//         const data = fs.readFileSync('normesFormules.json');
//         const normesJson = JSON.parse(data);
//         return res.status(200).json({code:"green",data:normesJson});
//     } catch (err) {
//         return res.status(500).json({code:"red",data:{},errorMessage:err.message});
//     }
// });

// ========================== NORMES JAVEL ==================================

server.post('/tn-api-campagne/javel/update-normes', (req, res) => {
    // const filePath = path.join(__dirname, 'normes.json');
    const newData = req.body;
    try {
        fs.writeFile('normesJavel.json', JSON.stringify(newData, null, 2),()=>{console.log('Normes javel bien modifié .');});
        return res.status(200).json({code:"green",data:newData,message: '✅ Normes updated' });
    } catch (error) {
        return res.status(500).json({code:"red",data:{},message: '❌ Update fail '+error.message });
    }
});

server.get('/tn-api-campagne/javel/get-normes', (req,res) => {
    // const filePath = path.join(__dirname, 'normes.json');
    try {
        const data = fs.readFileSync('normesJavel.json');
        const normesJson = JSON.parse(data);
        return res.status(200).json({code:"green",data:normesJson});
    } catch (err) {
        return res.status(500).json({code:"red",data:{},errorMessage:err.message});
    }
});
//=========================================================================
// Middlewear for all Wrong urls
server.use('*',function(req,res){
    return res.status(400).json({"code":"red","message":"URL inconnu ."})
})

var io = new Server(sServer, {
    cors: corsOptions,
    transports: ["websocket"], // Le client DOIT avoir le même
    maxHttpBufferSize: 1e7,    // Réduire à 10 Mo pour éviter les crashs RAM (R14)
    pingTimeout: 60000,         // Augmenter à 60s pour la stabilité sur Heroku
    pingInterval: 25000,        // Intervalle standard
    // connectionStateRecovery: {} // Optionnel : retirez-le tant que le bug persiste
});



io.on('connection', async (socket) => {
    
    const {allAnalysesPoudre,getAnalysePoudre}=analysePoudreCtrler;
    const {allAnalyses,getAnalyse}=analyseCtrler;
    function leaveAllRooms() {for (const room of socket.rooms) {if (room !== socket.id){socket.leave(room);}}};
    async function LansasSocket(data){
        const {startedAt,endedAt,id}=data;
        const {lansas,formules}= await allAnalysesPoudre(req={query:{startedAt:startedAt,endedAt:endedAt}},res={});
        const newAnalyse= await getAnalysePoudre(req={params:{id:id}},res={});
        const {ok,message,analyse}=newAnalyse;
        var reportedAnalyse = {};
        if (analyse) {
            reportedAnalyse = analyse.get ? analyse.get({ plain: true }) : analyse;
        } else {
            reportedAnalyse = { message: message || "Analyse introuvable" };
        }
        console.log("Nouvelle analyse Poudre récupérée :", reportedAnalyse);
        return {code:'green',newAnalyse:reportedAnalyse,lansas:lansas,analyses:[...lansas,...formules]};
    };
    async function CommentsPoudreSocket(data){
        const {startedAt,endedAt,commentedId}=data;
        const {lansas}= await allAnalysesPoudre(req={query:{startedAt:startedAt,endedAt:endedAt}},res={});
        const index=lansas.findIndex((analyse)=>analyse.id==commentedId);
        const newAnalyse= await getAnalysePoudre(req={params:{id:commentedId}},res={});// a reduire si pas besoin des dTA DE L'ANALYSE
        const {id,commentaires,analyse}= newAnalyse;
        return {commentaireIndex:index,type:'poudre',id:id,commentaires:commentaires};
    };
    async function liquidesSocket(data){
        const {startedAt,endedAt,id}=data;
        const analyses= await allAnalyses(req={query:{startedAt:startedAt,endedAt:endedAt}},res={});
        const newAnalyse= await getAnalyse(req={params:{id:id}},res={});
        const {ok,message,analyse}=newAnalyse;
        const reportedAnalyse=ok?analyse:{};
        return {code:'green',newAnalyse:reportedAnalyse,analyses:analyses};
    };
    async function CommentsSocket(data){
        const {startedAt,endedAt,commentedId}=data;
        const {analyses}= await allAnalyses(req={query:{startedAt:startedAt,endedAt:endedAt}},res={});
        const index=analyses.findIndex((analyse)=>analyse.id==commentedId);// de meme qu'ici
        const newAnalyse= await getAnalyse(req={params:{id:commentedId}},res={});
        const {id,commentaires,analyse}= newAnalyse;
        return {commentaireIndex:index,type:'liquide',id:id,commentaires:commentaires};
    };

    socket.on('disconnect', (reason) => {console.log('❌ disconnected ! Raison:', reason);});

    socket.on('joinRoom', (data) => {
        const {roomName} = data;
        const possibleRooms = ['Laboratoire central','Responsable', 'Tour', 'Responsable','Mera','Javel bouteilles','Projet javel','Comptabilite'];
        if (possibleRooms.includes(roomName)) {
            // socket.leave(roomName); // pour s'assurer que le socket ne s'accumule dans une salle
            leaveAllRooms(); // quitte toutes les autres salles sauf la sienne
            socket.join(roomName);
            socket.emit('roomJoiningStatus', { success: true,message:'Vous avez integré le bureau 🏢 ' + roomName?.toUpperCase()+' 🏢 avec succes'});
        } else {
            socket.emit('roomJoiningStatus', { success: false,message:'La tentative d\'integrer le bureau 🏢 ' + roomName?.toUpperCase()+' 🏢  a échoué.'});
        }
    });

    // ============================== POUDRE ========================================
    socket.on('analysePoudreAdded', async (data) => {
        try {
            // console.log("Données reçues du client au clic :", data);
            const resultatFinal = await LansasSocket(data);
            socket.broadcast.to('Tour').to('Laboratoire central').to('Responsable').emit('analysePoudreAdded', resultatFinal); 
        } catch (error) {
            console.error("Erreur lors du traitement LansasSocket :", error.message);
        }
    });
    socket.on('analysePoudreUpdated', async (data/**{startedAt,endedAt,id} */) => {
        try {
            // console.log("Données reçues du client au clic :", data); 
            const resultatFinal = await LansasSocket(data);
            socket.broadcast.to('Tour').to('Responsable').emit('analysePoudreUpdated', resultatFinal); 
        } catch (error) {
            console.error("Erreur lors du traitement LansasSocket :", error.message);
        }
    });
    // socket.on('commentPoudreAdded',(dta)=>socket.broadcast
    //     .to('Tour')
    //     .to('Laboratoire central')
    //     .to('Responsable')
    //     .emit('commentPoudreAdded', dta.message));
    socket.on('analysePoudreCommented', async (data/* {analyseId,analyseIdentifier,productType} */) => {
        try {
            const analyseComments/**{commentaires,analyseId,analyseIdentifier} */ = await CommentsPoudreSocket(data);
            socket.broadcast.to('Tour').to('Laboratoire central').to('Responsable').emit('analysePoudreCommented', analyseComments); 
        } catch (error) {
            console.error("Erreur lors du traitement CommentsPoudreSocket :", error.message);
        } 
    });
    // ======================== LIQUIDES ============================================
    socket.on('analyseAdded', async (data) => {
        try {
            // console.log("Données reçues du client au clic :", data);
            const resultatFinal = await LiquidesSocket(data);
            socket.broadcast.to('Laboratoire central').to('Responsable').emit('analyseAdded', resultatFinal); 
        } catch (error) {
            console.error("Erreur lors du traitement LiquidesSocket :", error.message);
        }
    });
    socket.on('analyseUpdated', async (data/**{startedAt,endedAt,id} */) => {
        try {
            // console.log("Données reçues du client au clic :", data);
            const resultatFinal = await LiquidesSocket(data);
            socket.broadcast.to('Laboratoire central').to('Responsable').emit('analyseUpdated', resultatFinal); 
        } catch (error) {
            console.error("Erreur lors du traitement LiquidesSocket :", error.message);
        }
    });
    socket.on('analyseCommented', async (data/* {analyseId,analyseIdentifier,productType} */) => {
        try {
            const analyseComments/**{commentaires,analyseId,analyseIdentifier} */ = await CommentsSocket(data);
            socket.broadcast.to('Laboratoire central').to('Responsable').emit('analyseCommented', analyseComments); 
        } catch (error) {
            console.error("Erreur lors du traitement CommentsSocket :", error.message);
        }
    });

    // ===============================================================================
    socket.on('navigate', async (data/* {pageFrom,pageTo,routeTo,user,dep} */) => {
        try {
            // console.log("Données reçues du client au clic :", data);
            const analyseComments/**{commentaires,analyseId,analyseIdentifier} */ = await CommentsSocket(data);
            socket.broadcast.to('Responsable').emit('navigate', analyseComments); 
        } catch (error) {
            console.error("Erreur lors du traitement LansasSocket :", error.message);
        }
    });

});

sServer.listen(PORT,function(){
    console.log('Server |ON|');
})
