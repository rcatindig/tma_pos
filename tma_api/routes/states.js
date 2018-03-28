var express = require('express');
var router = express.Router();
var State = require('../models/State');

router.get('/:id?', function (req, res, next) {

  if (req.params.id) {

    State.getStateById(req.params.id, function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {

    State.getAllStates(function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }

    });
  }
});

router.get('/getStatesByCountry/:id?', function (req, res, next) {

    if (req.params.id) {
  
      State.getStatesByCountryId(req.params.id, function (err, rows) {
  
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      });
    } 
  });

router.post('/', function (req, res, next) {

  State.addState(req.body, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 &amp;amp;amp; 0
    }
  });
});
router.delete('/:id', function (req, res, next) {

  State.deleteState(req.params.id, function (err, count) {

    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }

  });
});
router.put('/:id', function (req, res, next) {

  State.updateState(req.params.id, req.body, function (err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;