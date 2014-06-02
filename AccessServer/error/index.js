var path = require('path');
var util = require('util');
var http = require('http');

// Тут у нас обаботчик ошибок

// Создание собственного объекта ошибок
function HttpError(status, message)
{
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HttpError);

  this.status = status;
  this.message = message || http.STATUS_CODES[status] || "Error";
}
// Наследование
util.inherits(HttpError, Error);

HttpError.prototype.name = 'HttpError';

// Эксопорт
exports.HttpError = HttpError;


// Создание собственного объекта ошибок
function AppError(status, message)
{
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}
// Наследование
util.inherits(AppError, Error);

AppError.prototype.name = 'AppError';

exports.AppError = AppError;