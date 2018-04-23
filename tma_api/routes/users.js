var express 	= require('express'),
	router 		= express.Router(),
	User 		= require('../models/User'),
	jwt			= require('jsonwebtoken')
	_			= require('lodash'),
	config		= require('../config'),
	bcrypt		= require('bcrypt'),
	exjwt     	= require('express-jwt');


const { SALT_ROUNDS } = require('../constants');

// middleware
var UsersMW = require('../middlewares/UsersMW');
const { getUserList, countUsers } = UsersMW;

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

		User.getUserById(req.params.id, function (err, rows) {

			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} else {

		User.getAllUsers(function (err, rows) {

			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}

		});
	}
});
router.post('/', function (req, res, next) {

	User.addUser(req.body, function (err, count) {
		if (err) {
			res.json(err);
		} else {
			res.json(req.body); //or return count for 1 &amp;amp;amp; 0
		}
	});
});

router.post('/create', function (req, res, next){

	if (!req.body.username || !req.body.password) {
		return res.status(400).send("You must send the username and the password");
	}

	User.getUserByUsername(req.body, function(user){
		
			if(!user)
			{
				var hashPassword = "";

				user = {
					first_name: req.body.first_name,
					middle_name: req.body.middle_name,
					surname: req.body.surname,
					extension: req.body.extension,
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					client_id: req.body.client_id,
					address: req.body.address,
					country_id: req.body.country_id,
					state_id: req.body.state_id,
					status: req.body.status,
					is_deleted: null,
					is_client: req.body.is_client,
					role_id: req.body.role_id,
					date_created: req.body.date_created,
					date_modified: req.body.date_modified
				}
				User.addUser(user, function(err,result){
					if (err) res.json(err);

					newUser = {
						id: result.insertId,
						first_name: user.first_name,
						username: user.username,
						password: user.password,
						email: user.email
					};

					res.json(req.body);
				})
			} else {
				res.status(400).send("A user with that username already exists");
			}
	})

});

router.delete('/:id', function (req, res, next) {

	User.deleteUser(req.params.id, function (err, count) {

		if (err) {
			res.json(err);
		} else {
			res.json(count);
		}

	});
});
router.put('/:id', function (req, res, next) {

	User.updateUser(req.params.id, req.body, function (err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});
});

router.post('/getUserList/:id?', getUserList, countUsers);

module.exports = router;