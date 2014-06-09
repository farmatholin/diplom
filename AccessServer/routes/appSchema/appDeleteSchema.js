var Url = require('url');
var config = require('../../config');
var request = require('request');
var App = require('../../models/app').App;
var HttpError = require('../../error').HttpError;

// Создание Приложения
exports.delete = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    App.DeleteSchema(req.params.appId, req.params.schemaId, function(err, app, schema){
        if(err) return next(err);

        request(
            { method: 'DELETE',
                url: app.dataServer + '/collection/' + schema,
                headers: {
                    "Api-Key": req.params.appId,
                    "Api-App": app.name,
                    "Api-User": app.user
                }
            },
            function (error, response, body) {
                if (response.statusCode == 200) {
                    //res.end(body)
                } else {
                    return next(error);
                }
            }
        );
        res.send(schema);
    });
}