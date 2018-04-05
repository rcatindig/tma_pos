var express 	= require('express'),
    router 		= express.Router(),
    pdf         = require('html-pdf'),
    BackendReportsMW   = require('../middlewares/reports/BackendReportsMW');

const { getBackendReport, generateBackendReport, getClientDetails, getMachineDetails } = BackendReportsMW;

router.post('/generateBackendReport/', getClientDetails, 
                                        getMachineDetails, 
                                        getBackendReport, 
                                        generateBackendReport, function(req, res, next){
                                            res.status(201).send(req.fileName);
                                        });

module.exports = router;