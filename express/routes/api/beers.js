var express = require('express');
var router = express.Router();
var _beer = require('../../controllers/beers')

/* GET users listing. */
router.get('/', function(req, res) {
  _beer.retrieve(req, res);
});

router.get('/:id', function(req, res) {
  _beer.findOne(req, res);
});

router.post('/', function(req, res) {
  _beer.create(req, res);
});

module.exports = router;
