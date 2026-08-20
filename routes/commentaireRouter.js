var express=require('express');
var {commentaireCtrler}=require('../controllers/commentaireCtrler.js');

exports.router=(function(){
    var commentaireRouter=express.Router();

    //Users Routes
    commentaireRouter.route('/add').post(commentaireCtrler.add); // Cr.eate             |
    // commentaireRouter.route('/update/:id').put(commentaireCtrler.update); // U.pdate    | CRUD operations
    // commentaireRouter.route('/delete/:id').delete(commentaireCtrler.delete); // D.elete |
    
    // commentaireRouter.route('/:id').get(commentaireCtrler.One); // get One
    commentaireRouter.route('/').get(commentaireCtrler.all); // get All items

    
return commentaireRouter;

})();