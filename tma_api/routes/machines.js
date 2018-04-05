var express 	= require('express'),
	router 		= express.Router(),
	Machine 		= require('../models/Machine'),
	jwt			= require('jsonwebtoken')
	_			= require('lodash'),
	config		= require('../config'),
	bcrypt		= require('bcrypt'),
	exjwt     	= require('express-jwt');


const { SALT_ROUNDS } = require('../constants');


var secretKey = "don't share this key";

function createToken(user) {
	return jwt.sign(_.omit(user, 'password'), config.secretKey, {expiresIn: 60*60*5});
}

var jwtCheck = exjwt({
    secret: config.secretKey
});

router.use('/', jwtCheck);

router.get('/:id?', function (req, res, next) {

	if (req.params.id) {

		Machine.getMachineById(req.params.id, function (err, rows) {

			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} else {

		Machine.getAllMachines(function (err, rows) {

			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}

		});
	}
});

router.get('/:id?', function (req, res, next) {

	if (req.params.id) {

		Machine.getMachineById(req.params.id, function (err, rows) {

			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} else {

		Machine.getAllMachines(function (err, rows) {

			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}

		});
	}
});

router.get('/getMachinesByClientId/:id?', function (req, res, next) {

    console.log("HELLO");

    Machine.getMachinesByClientId(req.params.id, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            console.log(rows);
            res.json(rows);
        }
    });
});

module.exports = router;