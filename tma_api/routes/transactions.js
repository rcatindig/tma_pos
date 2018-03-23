var express = require('express');
var router = express.Router();
var Transaction = require('../models/Transaction');

router.get('/:id?', function (req, res, next) {

  if (req.params.id) {

    Transaction.getTransactionById(req.params.id, function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {

    Transaction.getAllTransactions(function (err, rows) {

      if (err) {
        res.json(err);
      } else {
		console.log(rows);
        res.json(rows);
      }

    });
  }
});


router.post('/', function (req, res, next) {

  console.log(req.body);

  Transaction.addTransaction(req.body, function (err, count) {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      res.json(req.body); //or return count for 1 &amp;amp;amp; 0
      console.log(req.body);
    }
  });
});

router.post('/getTransactions/', getTransactionList, countTransactions);

router.delete('/:id', function (req, res, next) {

  Transaction.deleteTransaction(req.params.id, function (err, count) {

    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }

  });
});


router.put('/:id', function (req, res, next) {

  Transaction.updateTransaction(req.params.id, req.body, function (err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});


// Middleware
function getTransactionList(req, res, next)
{
	Transaction.getTransactions(req.body, function (err, rows){

		var results = "";
		
		if (err) {
			res.json(err);
		} else {

			req.transactions = rows;
			next();
			
		}
	});
}

function countTransactions(req, res)
{
	Transaction.countTotalTransactions(req.body, function (err, fields){

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

module.exports = router;