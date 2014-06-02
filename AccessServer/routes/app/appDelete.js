var Url = require('url');
var config = require('../../config');
var request = require('request');
var App = require('../../models/app').App;
var HttpError = require('../../error').HttpError;

// Создание Приложения
exports.delete = function (req, res, next) {
    App.AppDelete(req.params.appId, function(err, app){
        if (err) return next(err);

        // получение имя бд
        var apiKey = app.AppKey.toString();
        var dbName = app.name + app.user + apiKey.substring(apiKey.length-5,apiKey.length);
        //Создание запроса

        request(
            { method: 'DELETE',
                url: app.dataServer + '/db/' + dbName
            }
            , function (error, response, body) {
                if (response.statusCode == 200) {
                    res.send(app)
                } else {
                    return next(error);
                }
            }
        );
    });
}