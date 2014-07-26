var Brewery = require('../models/brewery');
var msg = '';

module.exports = {
	renderList: function (req, res, cb) {
		var msg = 'Listagem completa';
		var view = 'breweries/list';
		var query = {};
		Brewery.find(query, function (err, data) {
			cb(err, data, res, view, msg);
		});
	},
	renderCreate: function (req, res, cb) {
		var msg = 'Cadastro de cerveja';
		var view = 'breweries/create';
		cb(null, null, res, view, msg);
	},
	renderShow: function (req, res, cb) {
		var msg = 'Consulta completa';
		var view = 'breweries/show';
		var id = req.params.id;
		var query = {
			_id: id
		};
		Brewery.findOne(query, function (err, data) {
			cb(err, data, res, view, msg);
		});
	},
	renderEdit: function (req, res, cb) {
		var msg = 'Alteração de cerveja';
		var view = 'breweries/edit';
		var id = req.params.id;
		var query = {
			_id: id
		};
		Brewery.findOne(query, function (err, data) {
			cb(err, data, res, view, msg);
		});
	},
	renderRemove: function (req, res, cb) {
		var msg = 'Remoção de cerveja';
		var view = 'breweries/remove';
		var id = req.params.id;
		var query = {
			_id: id
		};
		Brewery.findOne(query, function (err, data) {
			cb(err, data, res, view, msg);
		});
	}
};
