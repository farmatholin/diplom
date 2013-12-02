var Url = require('url');
var config = require('../config');
var request = require('request');
var App = require('../models/app').App;
var HttpError = require('../error').HttpError;

exports.post = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    App.getAppData(apiKey, function (err, app) {
        if (err) return next(err);

        var dbName = app.name + app.user + apiKey.substring(apiKey.length-5,apiKey.length)
        request(
            { method: 'POST',
                url: app.dataServer + '/db/' + dbName
            }
            , function (error, response, body) {
                if (response.statusCode == 200) {
                    res.end(body)
                } else {
                    return next(error);
                }
            }
        );
    });
}

exports.delete = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    App.getAppData(apiKey, function (err, app) {
        if (err) return next(err);

        var dbName = app.name + app.user + apiKey.substring(apiKey.length-5,apiKey.length)
        request(
            { method: 'DELETE',
                url: app.dataServer + '/db/' + dbName
            }
            , function (error, response, body) {
                if (response.statusCode == 200) {
                    res.end(body)
                } else {
                    return next(error);
                }
            }
        );
    });
}