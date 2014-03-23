var Url = require('url');
var config = require('../../config');
var request = require('request');
var App = require('../../models/App').App;
var HttpError = require('../../error').HttpError;

// Создание Приложения
exports.put = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
}