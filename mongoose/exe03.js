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
var BrewerySchema = new Schema({
	name: {type: String, default: ''},
	created: {type: Date, default: Date.now},
	beers: [{type: Schema.Types.ObjectId, ref: 'Beer'}]
});

var Brewery = mongoose.model('Brewery', BrewerySchema);

var BeerSchema = new Schema({
	name: {type: String, default: ''},
	description: {type: String, default: ''},
	alcohol: {type: Number, min: 0},
	category: {type: String, default: ''},
	created: {type: Date, default: Date.now},
	brewery: {type: Object, default: {name:''}}
});

var breweryData = {
	name: 'Ambev'
}

var brewery = new Brewery(breweryData);

brewery.save(function (err, data) {
	if (err) {
		console.log('Erro: ', err);
	} else {
		console.log('Cervejaria Inserida', data);
		var Beer = mongoose.model('Beer', BeerSchema);
		var beerData = {
			name: 'Heineken',
			description: 'Até q eh boazinha',
			alcohol: 5.5,
			category: 'lager',
			brewery: data
		}
		var beer = new Beer(beerData);
		beer.save(function (err, data) {
			if (err) {
				console.log('Erro: ', err);
			} else {
				console.log('Cerveja Inserida', data);
				Brewery.update({}, {
					beers: [data._id]
				}, function (err, data) {
					if (err) {
						console.log(err);
					} else {
						console.log(data)
					}
				});
			}
		});
		beerData = {
			name: 'Skol',
			description: 'Mijo de rato',
			alcohol: 4.7,
			category: 'lager',
			brewery: data
		}
		beer = new Beer(beerData);
		beer.save(function (err, data) {
			if (err) {
				console.log('Erro: ', err);
			} else {
				console.log('Cerveja Inserida', data);
				Brewery.update({}, {$push: { beers : data._id }},{upsert:true}, function (err, data) {
					if (err) {
						console.log(err);
					} else {
						console.log(data)
					}
				});
			}
		});
	}
});
