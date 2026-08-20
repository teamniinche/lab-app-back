var express=require('express');
var {commentairePoudreCtrler}=require('../controllers/commentairePoudreCtrler.js');

exports.router=(function(){
    var commentairePoudreRouter=express.Router();

    //Users Routes
    commentairePoudreRouter.route('/add').post(commentairePoudreCtrler.add); // Cr.eate             |
    // commentairePoudreRouter.route('/update/:id').put(commentaireCtrler.update); // U.pdate    | CRUD operations
    // commentairePoudreRouter.route('/delete/:id').delete(commentaireCtrler.delete); // D.elete |
    
    // commentairePoudreRouter.route('/:id').get(commentaireCtrler.One); // get One
    commentairePoudreRouter.route('/').get(commentairePoudreCtrler.all); // get All items

    
return commentairePoudreRouter;

})();