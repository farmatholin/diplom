var Url = require('url');
var config = require('../../config');
var request = require('request');
var App = require('../../models/app').App;
var HttpError = require('../../error').HttpError;

// Получение данных о приложении
exports.get = function (req, res, next) {
    App.getAppData(req.params.appId, function (err, app) {
        if (err) return next(err);

        // отправляем данные
        res.send(app);

    });
};

// получение всех приложений юзера
exports.getUser = function (req, res, next) {
    App.AppGetUser(req.params.userId, function (err, app) {
        if (err) return next(err);

        // отпровляем данные
        res.send(app);

    });
};