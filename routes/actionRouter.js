var express=require('express');
var {actionsCtrler}=require('../controllers/actionsCtrler.js');

exports.router=(function(){
    var actionRouter=express.Router();

    //Analyses Routes
    actionRouter.route('/add').post(actionsCtrler.add); // Cr.eate
    actionRouter.route('/delete/:id').delete(actionsCtrler.delete); // D.elete |
    actionRouter.route('/').get(actionsCtrler.all); // get All items

    
return actionRouter;

})();