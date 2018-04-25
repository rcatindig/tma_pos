var express     = require('express'), 
    router      = express.Router(),
    Client      = require('../models/Client')
    jwt     = require('express-jwt'),
    config  = require('../config');


    // MIDDLEWARE
var DashboardMW = require('../middlewares/DashboardMW');

const { getThisWeekRevenue, getLastWeekRevenue, getThisWeekTransaction, getLastWeekTransaction, getTodayRevenue, getThisMonthRevenue } = DashboardMW;

var jwtCheck = jwt({
    secret: config.secretKey
});
router.use('/', jwtCheck);


router.get('/getData/', getThisWeekRevenue, getLastWeekRevenue, getThisWeekTransaction, getLastWeekTransaction, getTodayRevenue, getThisMonthRevenue, function(req, res, next){
    
    const returnVal = {
        thisWeekRevenue: req.thisWeekRevenue,
        lastWeekRevenue: req.lastWeekRevenue,
        thisWeekTransaction: req.thisWeekTransaction,
        lastWeekTransaction: req.lastWeekTransaction,
        todayRevenue: req.todayRevenue,
        thisMonthRevenue: req.thisMonthRevenue,
    }

    res.json(returnVal);
    
});

module.exports = router;