var Url = require('url');
var config = require('../../config');
var request = require('request');
var App = require('../../models/app').App;
var HttpError = require('../../error').HttpError;

// Создание Приложения
exports.delete = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
}