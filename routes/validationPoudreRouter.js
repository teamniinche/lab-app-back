var express=require('express');
const auth = require('../middlewares/auth');
var {validationPoudreCtrler}=require('../controllers/validationPoudreCtrler.js');

exports.router=(function(){
    var validationPoudreRouter=express.Router();

    //Users Routes
    validationPoudreRouter.route('/update').put(validationPoudreCtrler.update); // U.pdate    | CRUD operations
    validationPoudreRouter.route('/action').put(auth,validationPoudreCtrler.act); // isolate || inject

    validationPoudreRouter.route('/').get(validationPoudreCtrler.all); // get All items


return validationPoudreRouter;

})();