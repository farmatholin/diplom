var Url = require('url');
var config = require('../../config');
var request = require('request');
var App = require('../../models/App').App;
var HttpError = require('../../error').HttpError;

// Создание Приложения
exports.post = function (req, res, next) {
    App.CreateApp(req.params.userId, req.body, function(err, app){
        if (err) return next(err);

        // получение имя бд
        var apiKey = app.AppKey.toString();
        var dbName = app.name + app.user + apiKey.substring(apiKey.length-5,apiKey.length);
        //Создание запроса

        request(
            { method: 'POST',
                url: app.dataServer + '/db/' + dbName
            }
            , function (error, response, body) {
                if (response.statusCode == 200) {
                    res.send(app)
                } else {
                    App.AppDelete(app.id);
                    return next(error);
                }
            }
        );
    });

}