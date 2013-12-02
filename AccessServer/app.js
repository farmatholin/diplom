var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./lib/log')(module);
var HttpError = require('./error').HttpError;

var app = express();

app.use(express.favicon());

if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use(require('./middleware/sendHttpError'));

app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(app.router);

require('./routes')(app);

app.use(function(err, req, res, next) {
    if (typeof err == 'number') { // next(404);
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        res.sendHttpError(err);
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

var ipaddress = 'localhost';
var port = 8082;

server.listen(port, ipaddress, function(){
    log.info('Express server listening on port ' + config.get('port'));
});