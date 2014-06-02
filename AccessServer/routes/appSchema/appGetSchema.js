var Url = require('url');
var config = require('../../config');
var request = require('request');
var App = require('../../models/app').App;
var HttpError = require('../../error').HttpError;

// Получение схемы приложения
exports.get = function (req, res, next) {
    App.GetSchema(req.params.schemaId, function(err, schema){
        if(err) return next(err);
        res.send(schema);
    });
};

exports.getSchemas = function(req, res, next){
    App.GetSchemas(req.params.id, function(err, schemas){
        if(err) return next(err);
        res.send(schemas);
    });
};
