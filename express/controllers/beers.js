var Beer = require("../models/beers");

var cb = function (err, data, res, msg) {
	var _msg = data;
	if (err) {
		_msg = {
			'Erro': err
		};
	}
	console.log(_msg);
	res.json(_msg);
};

module.exports = {
	create: function (req, res) {
		var dados = req.body;
		var model = new Beer(dados);
		model.save(function (err, data) {
			var msg = 'Cerveja ' + data.name + ' cadastrada com sucesso';
			cb(err, data, res, msg);
		});
	},
	retrieve: function (req, res) {
		Beer.find({}, function (err, data) {
			var msg = 'Cervejas listadas: ' + JSON.stringify(data);
			cb(err, data, res, msg);
		});
	},
	findOne: function (req, res) {
		var query = {
			_id: req.params.id
		}
		Beer.findOne(query, function (err, data) {
			var msg = 'Cerveja: ' + JSON.stringify(data);
			cb(err, data, res, msg);
		});
	},
	update: function (req, res) {
		var query = {
			name: 'Skol'
		};
		var mod = {
			alcohol: 99
		};
		var optional = {
			upsert: false,
			multi: true
		};
		Beer.update(query, mod, function (err, data) {
			var msg = 'Cerveja ' + query.name + ' alterada com sucesso';
			cb(err, data, res, msg);
		});
	},
	delete: function (req, res) {
		var query = {
			name: 'Skol'
		};
		Beer.remove(query, function (err, data) {
			var msg = 'Cervejas deletadas: ' + data;
			cb(err, data, res, msg);
		});
	}
};
