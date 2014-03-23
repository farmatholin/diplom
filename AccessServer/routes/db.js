var Url = require('url');
var config = require('../config');
var request = require('request');
var App = require('../models/App').App;
var HttpError = require('../error').HttpError;

// Создание DB
exports.post = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    // получение ключа
    var apiKey = req.header('api-key');

    //  получение данных о приложение по ключу
    App.getAppData(apiKey, function (err, app) {
        if (err) return next(err);

        // получение имя бд
        var dbName = app.name + app.user + apiKey.substring(apiKey.length-5,apiKey.length);
        //Создание запроса

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

// Удаление БД
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