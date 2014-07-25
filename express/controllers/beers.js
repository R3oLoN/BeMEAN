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
    },
    renderBeer: function(req, res) {
        var query = {_id: req.params.id};
        Beer.findOne(query, function (err, data) {
            if (err) {
                res.render('error', {
                    error: err
                });
            }
            res.render('beers/show', {
                title: 'Consulta de cerveja',
                beer: data
            });
        });
    },
    renderEdit: function(req, res) {
        var query = {_id: req.params.id};
        Beer.findOne(query, function (err, data) {
            if (err) {
                res.render('error', {
                    error: err
                });
            }
            res.render('beers/edit', {
                title: 'Consulta de cerveja',
                beer: data
            });
        });
    },
    renderCreate: function(res) {
        res.render('beers/create', {
            title: 'Consulta de cerveja'
        });
    },
    renderRemove: function(req, res) {
        var query = {_id: req.params.id};
        Beer.findOne(query, function (err, data) {
            if (err) {
                res.render('error', {
                    error: err
                });
            }
            res.render('beers/remove', {
                title: 'Remoção de cerveja',
                beer: data
            });
        });
    }
}
