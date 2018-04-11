var Role = require('../models/Role');


var RolesMW = {
    getRoleList: function(req, res, next)
    {
        Role.getRoleList(req.body, function (err, rows){

            var results = "";
            
            if (err) {
                res.json(err);
            } else {

                req.transactions = rows;
                next();
                
            }
        });
    },

    countRoles: function(req, res)
    {
        Role.countTotalRoles(req.body, function (err, fields){

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


module.exports = RolesMW;