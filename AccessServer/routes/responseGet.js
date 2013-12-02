var config = require('../config');
var request = require('request');
var App = require('../models/app').App;
var HttpError = require('../error').HttpError;

exports.get = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    App.getAppData(apiKey, function (err, app) {
        if (err) return next(err);

        request(
            { method: 'GET',
                url: app.dataServer + '/data/' + req.params.className,
                headers: {
                    "Api-Key": apiKey,
                    "Api-App": app.name,
                    "Api-User": app.user
                }
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

exports.getId = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    App.getAppData(apiKey, function (err, app) {
        if (err) return next(err);

        request(
            { method: 'GET',
                url: app.dataServer + '/data/' + req.params.className + '/' + req.params.id,
                headers: {
                    "Api-Key": apiKey,
                    "Api-App": app.name,
                    "Api-User": app.user
                }
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