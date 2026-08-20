var express=require('express');
const auth = require('../middlewares/auth');
var {utilisateurCtrler}=require('../controllers/utilisateurCtrler.js');

exports.router=(function(){
    var utilisateurRouter=express.Router();

    //Users Routes
    utilisateurRouter.route('/add').post(auth, utilisateurCtrler.add); // Cr.eate       |
    utilisateurRouter.route('/changePwd').put(utilisateurCtrler.changePwd);
    utilisateurRouter.route('/update/:id').put(auth, utilisateurCtrler.update); // U.pdate     | CRUD user's operations
    utilisateurRouter.route('/delete/:userId/:id').delete(auth, utilisateurCtrler.delete); // D.elete  |

    utilisateurRouter.route('/login').post(utilisateurCtrler.login); // Login
    utilisateurRouter.route('/doesExist').post(utilisateurCtrler.doesExist); // Login
    utilisateurRouter.route('/:id').get(utilisateurCtrler.One); // get One user
    utilisateurRouter.route('/').get(utilisateurCtrler.all); // get All users
    
return utilisateurRouter;

})();