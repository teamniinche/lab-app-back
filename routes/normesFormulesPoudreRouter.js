var express=require('express');
var {getNormesPoudre,updateNormesPoudre}=require('../controllers/normesFormulesPoudreCtrler.js');

exports.router=(function(){
    var normeFormulesPoudreRouter=express.Router();

    //Normes Routes
    // normeRouter.route('/add').post(addNormes); // Cr.eate       |
    normeFormulesPoudreRouter.route('/get-normes').get(getNormesPoudre); // Get-normes      | CRUD normes's operations
    normeFormulesPoudreRouter.route('/update-normes').put(updateNormesPoudre); // Cr.eate & U.pdate  |

return normeFormulesPoudreRouter;

})();
