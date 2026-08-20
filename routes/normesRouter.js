var express=require('express');
var {getNormes,updateNormes}=require('../controllers/normesCtrler.js');

exports.router=(function(){
    var normeRouter=express.Router();

    //Normes Routes
    // normeRouter.route('/add').post(addNormes); // Cr.eate       |
    normeRouter.route('/get-normes').get(getNormes); // Get-normes      | CRUD normes's operations
    normeRouter.route('/update-normes').put(updateNormes); // Cr.eate & U.pdate  |

return normeRouter;

})();
