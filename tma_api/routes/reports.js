var express 	= require('express'),
    path        = require('path'),
    mime        = require('mime'),
    fs          = require('fs'),
    router 		= express.Router(),
    pdf         = require('html-pdf'),
    BackendReportsMW   = require('../middlewares/reports/BackendReportsMW');

const { getBackendReport, generateBackendReport, getClientDetails, getMachineDetails } = BackendReportsMW;

router.post('/generateBackendReport/', getClientDetails, 
                                        getMachineDetails, 
                                        getBackendReport, 
                                        generateBackendReport, function(req, res, next){
                                            var file =  req.fileName;

                                            var filename = path.basename(file);
                                            var mimetype = mime.lookup(file);

                                            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                                            res.setHeader('Content-type', mimetype);
                                            var filestream = fs.createReadStream(file);
                                            filestream.pipe(res);
                                            
                                        });

module.exports = router;