var BackendReport = require('../models/BackendReport');
var Transaction = require('../models/Transaction');


var DashboardMW = {
    getThisWeekRevenue: function(req, res, next)
    {
        BackendReport.getThisWeekRevenue(function(err, fields) {
                    
            if (err) {
                console.log(err);
            } else {
                req.thisWeekRevenue = fields[0].revenue;
                next();
                    
                //res.json(result);
            }
        })   
    },

    getLastWeekRevenue: function(req, res, next)
    {
        BackendReport.getLastWeekRevenue(function(err, fields) {
                    
            if (err) {
                console.log(err);
            } else {
                req.lastWeekRevenue = fields[0].revenue;
                next();
                    
                //res.json(result);
            }
        })   
    },
    getTodayRevenue: function(req, res, next)
    {
        BackendReport.getTodayRevenue(function(err, fields) {
                    
            if (err) {
                console.log(err);
            } else {
                req.todayRevenue = fields[0].revenue;
                next();
                    
                //res.json(result);
            }
        })   
    },
    getThisMonthRevenue: function(req, res, next)
    {
        BackendReport.getThisMonthRevenue(function(err, fields) {
                    
            if (err) {
                console.log(err);
            } else {
                req.thisMonthRevenue = fields[0].revenue;
                next();
                    
                //res.json(result);
            }
        })   
    },
    getThisWeekTransaction: function(req, res, next)
    {
        Transaction.getThisWeekTransaction(function(err, fields) {
                    
            if (err) {
                console.log(err);
            } else {
                req.thisWeekTransaction = fields[0].total;
                next();
                    
                //res.json(result);
            }
        })   
    },

    getLastWeekTransaction: function(req, res, next)
    {
        Transaction.getLastWeekTransaction(function(err, fields) {
                    
            if (err) {
                console.log(err);
            } else {
                req.lastWeekTransaction = fields[0].total;
                next();
                    
                //res.json(result);
            }
        })   
    },
    
}


module.exports = DashboardMW;