var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./lib/log')(module);
var HttpError = require('./error').HttpError;
var AppError = require('./error').AppError;

var app = express();

app.use(express.favicon());

app.set('env', process.env.NODE_ENV);

if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/sendAppError'));

app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(app.router);

require('./routes')(app);

// Обработка ошибок

app.use(function(err, req, res, next) {
    if (typeof err == 'number') { // next(404);
        err = new HttpError(err);
    }
    if (err instanceof HttpError) { //Если ошибка в REST то рендерим её
        log.error(err);
        res.sendHttpError(err);

    } if (err instanceof AppError) { // Если ошибка в модели приложении то ренжерим её и отпровляем сообщение
        log.error(err);
        res.sendAppError(err);

    } else {
        if (app.get('env') == 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

var server = http.createServer(app);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8082;


server.listen(port, ipaddress, function(){
    log.info('Express server listening on port ' + port);
});