var express = require('express');
var router = express.Router();
var Transaction = require('../models/Transaction');
var TransactionsMW = require('../middlewares/TransactionsMW');

const {
  getTransactionList,
  countTransactions
} = TransactionsMW;

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



  Transaction.addTransaction(req.body, function (err, count) {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      res.json(req.body); //or return count for 1 &amp;amp;amp; 0

    }
  });
});

router.post('/getTransactions/:id?', getTransactionList, countTransactions);

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

router.post('/createNewTransaction/', function (req, res, next) {
	Transaction.insertTransactionFromClient(req.body, function(err, result) {
		console.log("ERROR", err);
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	})
})


// Middleware


module.exports = router;