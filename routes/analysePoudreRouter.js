var express=require('express');
const auth = require('../middlewares/auth');
var {analysePoudreCtrler}=require('../controllers/analysePoudreCtrler.js');

exports.router=(function(){
    var analysePoudreRouter=express.Router();

    //Analyses Routes
    analysePoudreRouter.route('/add').post(auth, analysePoudreCtrler.add); // Cr.eate 
    analysePoudreRouter.route('/update/:id').put(auth, analysePoudreCtrler.update); 
    analysePoudreRouter.route('/updateTour/:id').put(auth, analysePoudreCtrler.updateTour);
    analysePoudreRouter.route('/updateChariot/:id').put(analysePoudreCtrler.updateChariot);
    analysePoudreRouter.route('/delete/:userId/:id').delete(auth, analysePoudreCtrler.delete); // D.elete |
    analysePoudreRouter.route('/extra').get(analysePoudreCtrler.extra);
    analysePoudreRouter.route('/get').get(analysePoudreCtrler.get);
    analysePoudreRouter.route('/local').get(analysePoudreCtrler.local);
    analysePoudreRouter.route('/diam').get(analysePoudreCtrler.diam);
    analysePoudreRouter.route('/auto').get(analysePoudreCtrler.auto);
    analysePoudreRouter.route('/lansas').get(analysePoudreCtrler.lansas);
    analysePoudreRouter.route('/formules').get(analysePoudreCtrler.formules);
    analysePoudreRouter.route('/lansasAndformules').get(analysePoudreCtrler.lansasAndFormules);
    analysePoudreRouter.route('/:id').get(analysePoudreCtrler.One); // get One
    analysePoudreRouter.route('/').get(analysePoudreCtrler.all); // get All items

    
return analysePoudreRouter;

})();