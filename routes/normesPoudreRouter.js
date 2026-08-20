var express=require('express');
var {getNormesPoudre,updateNormesPoudre,getNormes}=require('../controllers/normesPoudreCtrler.js');

exports.router=(function(){
    var normePoudreRouter=express.Router();

    //Normes Routes
    // normeRouter.route('/add').post(addNormes); // Cr.eate       |
    normePoudreRouter.route('/get-normes').get(getNormesPoudre); // Get-normes      | CRUD normes's operations
    normePoudreRouter.route('/get-lansasAndFormules').get(getNormes); // Get-normes      | CRUD normes's operations
    normePoudreRouter.route('/update-normes').put(updateNormesPoudre); // Cr.eate & U.pdate  |

return normePoudreRouter;

})();
