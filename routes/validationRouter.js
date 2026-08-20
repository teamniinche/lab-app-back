var express=require('express');
var {validationCtrler}=require('../controllers/validationCtrler.js');

exports.router=(function(){
    var validationRouter=express.Router();

    //Users Routes
    // validationRouter.route('/add').post(validationCtrler.add); // Cr.eate             |
    validationRouter.route('/update').put(validationCtrler.update); // U.pdate    | CRUD operations
    // validationRouter.route('/delete/:id').delete(validationCtrler.delete); // D.elete |

    // validationRouter.route('/:id').get(validationCtrler.One); // get One
    validationRouter.route('/').get(validationCtrler.all); // get All items


return validationRouter;

})();