var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./lib/log')(module);

var app = express();

app.use(express.favicon());

app.set('env', process.env.NODE_ENV);

//TODO: Добавить Обработку ошибок
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

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8081;
        
server.listen(port, ipaddress, function(){
    log.info('Express server listening on port ' + port);
});