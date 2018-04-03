var express 	= require('express'),
	router 		= express.Router(),
	User 		= require('../models/User'),
	jwt			= require('jsonwebtoken')
	_			= require('lodash'),
	config		= require('../config'),
	bcrypt		= require('bcrypt'),
    exjwt     	= require('express-jwt');


function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secretKey, {expiresIn: 60*60*5});
}
    

router.post('/', function(req, res, next){

    User.getUserByUsername(req.body, function(user){
        
        if(!user)
            res.status(400).send("Username cannot be found.");
        else {

            var hashPassword = user.password;

            var compare = bcrypt.compareSync(req.body.password, hashPassword);

            if(!compare) {
                res.status(400);
                res.send("Password is incorrect."); 
                console.log("NOT COMPARE");
            } else {
                res.status(201).send({
                    id_token: createToken(user)
                })
            }
            
            
        }
        
    })
})

module.exports = router;