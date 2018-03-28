var Client = require('../models/Client');


var ClientsMW = {
    getClientList: function(req, res, next)
    {
        console.log("PARAMETERS", req.body);
        Client.getClientList(req.body, function (err, rows){

            var results = "";
            
            if (err) {
                res.json(err);
            } else {

                req.transactions = rows;
                next();
                
            }
        });
    },

    countClients: function(req, res)
    {
        Client.countTotalClients(req.body, function (err, fields){

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


module.exports = ClientsMW;