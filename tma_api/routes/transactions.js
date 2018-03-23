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
        res.json(rows);
      }

    });
  }
});
router.post('/', function (req, res, next) {

  Transaction.addTransaction(req.body, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 &amp;amp;amp; 0
    }
  });
});
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
module.exports = router;