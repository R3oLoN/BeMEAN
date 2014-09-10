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
	category: {type: String, default: ''},
	created: {type: Date, default: Date.now},
	brewery: {type: Object, default: {name:''}}
});
var BrewerySchema = new Schema({
	name: {type: String, default: ''},
	created: {type: Date, default: Date.now},
	beers: [{type: Schema.Types.ObjectId, ref: 'Beer'}]
});
var Beer = mongoose.model('Beer', BeerSchema);
var Brewery = mongoose.model('Brewery', BrewerySchema);

Beer
	.find({}, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data)
		}
	});

Brewery
	.findOne({})
	.populate('beers','name alcohol')
	.exec(function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data)
		}
	});
