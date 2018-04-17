var express = require('express'),
	router = express.Router(),
	jwt = require('express-jwt'),
	config = require('../config');
RolePermission = require('../models/RolePermission');


var jwtCheck = jwt({
	secret: config.secretKey
});

router.use('/', jwtCheck);

router.get('/:id?', function (req, res, next) {

	if (req.params.id) {

		RolePermission.getRolePermissionById(req.params.id, function (err, rows) {

			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	} else {

		RolePermission.getAllRolePermissions(function (err, rows) {

			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}

		});
	}
});



router.get('/getByRoleId/:id?', function (req, res, next) {


	if (req.params.id) {

		RolePermission.getRolePermissionByRoleId(req.params.id, function (err, rows) {

			if (err) {
				res.json(err);
			} else {
				res.json(rows);
			}
		});
	}
});

router.post('/', function (req, res, next) {

	RolePermission.addRolePermission(req.body, function (err, count) {
		if (err) {
			res.json(err);
		} else {
			res.json(req.body); //or return count for 1 &amp;amp;amp; 0
		}
	});
});

router.post('/getPermissionByRoleAndModule', function (req, res, next) {

	RolePermission.getPermissionByRoleAndModule(req.body, function (err, fields) {
		if (err) {
			res.json(err);
		} else {
			res.json(fields); //or return count for 1 &amp;amp;amp; 0
		}
	});
});
router.delete('/:id', function (req, res, next) {

	RolePermission.deleteRolePermission(req.params.id, function (err, count) {

		if (err) {
			res.json(err);
		} else {
			res.json(count);
		}

	});
});
router.put('/:id', function (req, res, next) {

	RolePermission.updateRolePermission(req.params.id, req.body, function (err, rows) {

		if (err) {
			res.json(err);
		} else {
			res.json(rows);
		}
	});
});
router.post('/savePermission/', function (req, res, next) {
	RolePermission.saveRolePermissions(req.body, function (err, result) {
		console.log(result);
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	})
})
module.exports = router;