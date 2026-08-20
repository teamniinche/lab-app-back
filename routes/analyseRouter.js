var express=require('express');
const auth = require('../middlewares/auth');
var {analyseCtrler}=require('../controllers/analyseCtrler.js');

exports.router=(function(){
    var analyseRouter=express.Router();

    //Analyses Routes
    analyseRouter.route('/add').post(auth, analyseCtrler.add); // Cr.eate 
    // analyseRouter.route('/silicate/add').post(analyseCtrler.silicateAdd); // Cr.eate             |
    // analyseRouter.route('/caustique/add').post(analyseCtrler.caustiqueAdd); // Cr.eate             |
    // analyseRouter.route('/eau/add').post(analyseCtrler.eauAdd); // Cr.eate             |
    // analyseRouter.route('/mera/add').post(analyseCtrler.meraAdd); // Cr.eate            |
    //             |
    analyseRouter.route('/update/:id').put(auth, analyseCtrler.update); // U.pdate    | CRUD operations
    // analyseRouter.route('/matiere_active/update/:id').put(analyseCtrler.matiereActiveUpdate); // U.pdate    | CRUD operations
    // analyseRouter.route('/viscosite/update/:id').put(analyseCtrler.viscositeUpdate); // U.pdate    | CRUD operations


    analyseRouter.route('/delete/:userId/:id').delete(auth, analyseCtrler.delete); // D.elete |
    
    analyseRouter.route('/multiusages').get(analyseCtrler.multiusages);
    analyseRouter.route('/cosmetiques').get(analyseCtrler.cosmetiques);
    analyseRouter.route('/pates').get(analyseCtrler.pates);
    analyseRouter.route('/causilicate').get(analyseCtrler.causilicate);
    analyseRouter.route('/eaux').get(analyseCtrler.eaux);
    analyseRouter.route('/:id').get(analyseCtrler.One); // get One
    analyseRouter.route('/').get(analyseCtrler.all); // get All items

    
return analyseRouter;

})();