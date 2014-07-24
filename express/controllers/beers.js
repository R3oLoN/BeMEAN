var Beer = require("../models/beers");

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

module.exports = {
    renderList: function (req, res) {
        Beer.find({}, function (err, data) {
            if (err) {
                res.render('error', {
                    error: err
                });
            }
            res.render('beers/list', {
                title: 'Lista de cervejas',
                beers: data
            });
        });
    }
}
