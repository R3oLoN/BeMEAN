"use strict"
var http = require("http");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workshop-criciuma');
var db = mongoose.connection;
db.on('error', function (err) {
	console.log('Erro de conexao.', err);
});
db.once('open', function () {
	console.log('Conexão aberta.');
});

var Schema = mongoose.Schema;
var BeerSchema = new Schema({
	name: {type: String, default: ''},
	description: {type: String, default: ''},
	alcohol: {type: Number, min: 0},
	price: {type: Number, min: 0},
	category: {type: String, default: ''},
	created: {type: Date, default: Date.now}
});
var Beer = mongoose.model('Beer', BeerSchema);

http.createServer(function (request, response) {
	response.writeHead(200, {"Content-Type": "text/html;charset=utf8"});
	var url = request.url;
	response.write("<h1>Hello World</h1>");
	console.log('URL: ', url);
	if (url === "/create") {
		var dados = {
			name: 'Heineken',
			description: 'Até q eh boazinha',
			alcohol: 5.5,
			price: 3,
			category: 'lager'
		}
		var model = new Beer(dados);
		model.save(function (err, data) {
			if (err) {
				console.log('Erro: ', err);
			} else {
				console.log('Cerveja Inserida', data);
			}
			response.end();
		});
	}else{
		response.end("Rota não encontrada!");
	}
}).listen(3000);
console.log('Server running at http://localhost:3000/');
