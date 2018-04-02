var User = require('../models/User');


var UsersMW = {
    getUserList: function(req, res, next)
    {
        User.getUserList(req.body, function (err, rows){

            var results = "";
            
            if (err) {
                res.json(err);
            } else {

                req.transactions = rows;
                next();
                
            }
        });
    },

    countUsers: function(req, res)
    {
        User.countTotalUsers(req.body, function (err, fields){

            var results = "";

            
            if (err) {
                res.json(err);
            } else {



                var data = {
                    totalRecords: fields[0].total,
                    transactions: req.transactions
                }
                
                res.json(data);
                
            }
        });
    }
}


module.exports = UsersMW;