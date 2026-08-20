var express=require('express');
var {validationPoudreCtrler}=require('../controllers/validationPoudreCtrler.js');

exports.router=(function(){
    var validationPoudreRouter=express.Router();

    //Users Routes
    validationPoudreRouter.route('/update').put(validationPoudreCtrler.update); // U.pdate    | CRUD operations

    validationPoudreRouter.route('/').get(validationPoudreCtrler.all); // get All items


return validationPoudreRouter;

})();