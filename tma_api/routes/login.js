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

    console.log("HELLO");
    User.getUserByUsername(req.body, function(user){
        //console.log(rows);
        //if (err) res.json(err);
        //if (rows.length < 1) res.status(400).send("Username is invalid");

        

        //var user = rows;
        if(!user)
            res.status(400).send("Username cannot be found.");
        else {
            res.status(201).send({
                //user: user,
                id_token: createToken(user)
            })
        }
        
    })
})

module.exports = router;