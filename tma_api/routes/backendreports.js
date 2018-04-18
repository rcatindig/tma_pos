var express 	    = require('express'),
    router 		    = express.Router(),
    pdf             = require('html-pdf'),
    BackendReport   = require('../models/BackendReport');


router.post('/syncBackendReport/', function(req, res, next) {
    BackendReport.syncBackendReport(req.body, function(err, result) {
        console.log(err);
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	})
});

module.exports = router;