var request = require('request');
var config = require('../config');
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.getIndex = function(req, res, next){

    // Получаем Сервер Доступа из конфига
    var accessServer = config.get('accessServer');
    // Отпровляем запрос на сервер, ищем приложения
    request(
        { method: 'GET',
            url: accessServer + '/app/user/'+ req.session.user
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                // Если всё гуд, то вырисовываем всё это дело
                var apps = JSON.parse(body);
                res.render('dashboard/index', {apps: apps});
            } else {
                return next(error);
            }
        }
    );
};


///// Работа с приложениями
exports.addApp = function(req, res, next){
    res.render('dashboard/addApp');
};

exports.addAppPost = function(req, res, next){
    var name = req.body.name;

    var accessServer = config.get('accessServer');

    request(
        { method: 'POST',
            url: accessServer + '/app/'+ req.session.user,
            form: {name: name}
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                req.user.addApp(name, body._id, function(err, user){
                    if(err){
                        return next(err);
                    }
                    res.send({});
                });
            } else {
                return next(error);
            }
        }
    );

};

exports.editApp = function(req, res, next){


    var accessServer = config.get('accessServer');
    // Отпровляем запрос на сервер, ищем приложения
    request(
        { method: 'GET',
            url: accessServer + '/app/'+ req.params.id
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                // Если всё гуд, то вырисовываем всё это дело
                var app = JSON.parse(body);
                res.render('dashboard/editApp', {app: app});
            } else {
                return next(error);
            }
        }
    );
};

exports.editAppPost = function(req, res, next){
    //Ничего эдить нельзя
    res.send({})
};

exports.deleteApp = function(req, res, next){
    // Получаем Сервер Доступа из конфига
    var accessServer = config.get('accessServer');
    // Отпровляем запрос на сервер, ищем приложения
    request(
        { method: 'DELETE',
            url: accessServer + '/app/'+ req.params.id
        },
        function (error, response, body) {
            if (response.statusCode == 200) {

                var bodyParsed = JSON.parse(body);
                req.user.deleteApp(bodyParsed.name, function(err, user){
                    if(err){
                        next(err);
                    }
                    res.writeHead(302,{'location':'/dashboard'});
                    res.end();
                });

            } else {
                return next(error);
            }
        }
    );
};


/////// Работа с юзером
exports.getLogin = function(req, res, next){
    res.render('dashboard/login');
};

exports.getReg = function(req, res, next){
    res.render('dashboard/reg');
};

exports.postReg = function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    User.registration(username, password, email, function(err, user){
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});
    });
};

exports.postLogout = function(req, res, next){
    req.session.destroy();
    res.redirect('/');
};

exports.postLogin = function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});
    });
};