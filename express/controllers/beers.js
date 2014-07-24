var Beer = require("../../models/beers");

var cb = function (err, data, res) {
	var _msg = data;
	if (err) {
		_msg = {
			'Erro': err
		};
	}
	console.log(_msg);
	res.json(_msg);
};
