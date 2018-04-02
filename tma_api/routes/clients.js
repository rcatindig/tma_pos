var express     = require('express'), 
    router      = express.Router(),
    Client      = require('../models/Client')
    jwt     = require('express-jwt'),
    config  = require('../config');


// MIDDLEWARE
var ClientsMW = require('../middlewares/ClientsMW');

const { getClientList, countClients } = ClientsMW;

var jwtCheck = jwt({
    secret: config.secretKey
});
router.use('/', jwtCheck);

router.get('/:id?', function (req, res, next) {

  if (req.params.id) {

    Client.getClientById(req.params.id, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
  } else {

    Client.getAllClients(function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }

    });
  }
});

router.post('/', function (req, res, next) {


  Client.addClient(req.body, function (err, count) {
    if (err) {
        res.json(err);
    } else {
        res.json(req.body); //or return count for 1 &amp;amp;amp; 0
    }
  });
});

router.delete('/:id', function (req, res, next) {

  Client.deleteClient(req.params.id, function (err, count) {

    if (err) {
        res.json(err);
    } else {
        res.json(count);
    }

  });
});

router.put('/:id', function (req, res, next) {

  Client.updateClient(req.params.id, req.body, function (err, rows) {

    if (err) {
        res.json(err);
    } else {
        res.json(rows);
    }
  });
});

router.post('/getClientList/', getClientList, countClients);

module.exports = router;