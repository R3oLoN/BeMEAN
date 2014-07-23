var http = require("http");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workshop-criciuma');

var db = mongoose.connection;
db.on('error', function (err) {
	console.log('Erro de conexao.', err)
});
db.once('open', function () {
	console.log('Conexão aberta.')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
	name: {type: String, default: ''},
	description: {type: String, default: ''},
	alcohol: {type: Number, min: 0},
	price: {type: Number, min: 0},
	category: {type: String, default: ''},
	created: {	type: Date, default: Date.now}
});

var Beer = mongoose.model('Beer', BeerSchema);

var cb = function (err, data, res, msg) {
	var _msg = msg;
	if (err) {
		_msg = 'Erro: ' + err;
	}
	console.log(_msg);
	res.end(_msg);
};

var _beer = {
	create: function(req, res){
		var dados = {
			name: 'Skol',
			description: 'Mijo de Rato',
			alcohol: 4.5,
			price: 3,
			category: 'pilsen'
		}
		var model = new Beer(dados);
		model.save(function (err, data) {
			var msg = 'Cerveja ' + data.name + ' cadastrada com sucesso';
			cb(err, data, res, msg);
		});
	},
	retrieve: function(req, res){
		Beer.find({}, function (err, data) {
			var msg = 'Cervejas listadas: ' + JSON.stringify(data);
			cb(err, data, res, msg);
		});
	},
	update: function(req, res){
		var query = {name: 'Skol'};
		var mod = {alcohol: 99};
		var optional = {upsert: false, multi: true};
		Beer.update(query, mod, function (err, data) {
			var msg = 'Cerveja ' + query.name + ' alterada com sucesso';
			cb(err, data, res, msg);
		});
	},
	delete: function(req, res){
		var query = {name: 'Skol'};
		Beer.remove(query, function (err, data) {
			var msg = 'Cervejas deletadas: ' + data;
			cb(err, data, res, msg);
		});
	}
};

http.createServer(function (req, res) {
	res.writeHead(200, {
		"Content-Type": "text/plain;charset=utf8"
	});

	var url = req.url;
	// res.write('Hello World');
	console.log('URL: ', url);

	switch (url) {
	case '/create':
		_beer.create(req,res);
		break;
	case '/retrieve':
		_beer.retrieve(req,res);
		break;
	case '/update':
		_beer.update(req,res);
		break;
	case '/delete':
		_beer.delete(req,res);
		break;
	default:
		res.end('Rota não encontrada!');
	}

}).listen(3000);
console.log('Server running at http://localhost:3000/');
