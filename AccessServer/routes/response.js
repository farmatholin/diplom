var config = require('../config');
var request = require('request');
var App = require('../models/App').App;
var HttpError = require('../error').HttpError;

exports.put = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    App.getAppData(apiKey, function (err, app) {
        if (err) return next(err);

        request(
            { method: 'PUT',
                url: app.dataServer + '/data/' + req.params.className + '/' + req.params.id,
                headers: {
                    "Api-Key": apiKey,
                    "Api-App": app.name,
                    "Api-User": app.user
                },
                form: req.body
            },
            function (error, response, body) {
                if (response.statusCode == 200) {
                    res.end(body)
                } else {
                    return next(error);
                }
            }
        );
    });
};

exports.delete = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    App.getAppData(apiKey, function (err, app) {
        if (err) return next(err);

        request(
            { method: 'DELETE',
                url: app.dataServer + '/data/' + req.params.className + '/' + req.params.id,
                headers: {
                    "Api-Key": apiKey,
                    "Api-App": app.name,
                    "Api-User": app.user
                },
                form: req.body
            },
            function (error, response, body) {
                if (response.statusCode == 200) {
                    res.end(body)
                } else {
                    return next(error);
                }
            }
        );
    });
};