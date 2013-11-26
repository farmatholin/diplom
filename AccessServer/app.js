var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./lib/log')(module);

var app = express();

app.use(express.favicon());

if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(app.router);

require('./routes')(app);

var server = http.createServer(app);

var ipaddress = 'localhost';
var port = 8082;

server.listen(port, ipaddress, function(){
    log.info('Express server listening on port ' + config.get('port'));
});