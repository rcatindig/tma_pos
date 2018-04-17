var Role = require('../models/Role');


var RolesMW = {
    getRoleList: function(req, res, next)
    {
       
        var clientId = req.params.id ? req.params.id : null;
        
        Role.getRoleList(clientId, req.body, function (err, rows){

            var results = "";
            
            if (err) {
                res.json(err);
            } else {

                req.roles = rows;
                next();
                
            }
        });
    },

    countRoles: function(req, res)
    {
        var clientId = req.params.id ? req.params.id : null;
        Role.countTotalRoles(clientId, req.body, function (err, fields){

            var results = "";

            
            if (err) {
                res.json(err);
            } else {



                var data = {
                    totalRecords: fields[0].total,
                    roles: req.roles
                }
                
                res.json(data);
                
            }
        });
    }
}


module.exports = RolesMW;