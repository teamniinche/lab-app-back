var jwt=require("jsonwebtoken");
var constants=require('../config/constants.js');

var JWT_SIGN_SECRET=process.env.JWT_SIGN_SECRET;
//|| constants.JWT_SIGN_SECRET;
module.exports={
    generatedToken:function(userData){
        return jwt.sign({
            id:userData.id,
            isAdmin:userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn:"1h"
        })
    },
    parseAuthorization:function(authorization){
        return (authorization!=null)?authorization.replace('bearer ',''):null;
    },
    getUserId:function(authorization){
        var userId=-1;
        var token=module.exports.parseAuthorization(authorization);
        if(token!=null){
            try{
                var jwtToken=jwt.verify(token,JWT_SIGN_SECRET);
                if(jwtToken!=null){
                    userId=jwtToken.id;
                }
            }catch(error){
                
            }
        }
        return userId;
    }
}