var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('beers/list', { title: 'Listagem das cervejas' });
});

module.exports = router;
