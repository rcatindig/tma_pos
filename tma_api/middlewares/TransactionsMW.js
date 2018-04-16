var Transaction = require('../models/Transaction');


var TransactionsMW = {
    getTransactionList: function(req, res, next)
    {
        let clientId = null;

        if(req.params.id)
            clientId = req.params.id;

        Transaction.getTransactions(clientId, req.body, function (err, rows){

            var results = "";
            
            if (err) {
                res.json(err);
            } else {

                req.transactions = rows;
                next();
                
            }
        });
    },

    countTransactions: function(req, res)
    {
        let clientId = null;

        if(req.params.id)
            clientId = req.params.id;

        Transaction.countTotalTransactions(clientId, req.body, function (err, fields){

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


module.exports = TransactionsMW;