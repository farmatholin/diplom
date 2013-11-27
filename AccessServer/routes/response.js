var config = require('../config');
var request = require('request');

exports.get = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    request(
        { method: 'GET',
            url: 'http://serv1-farmathapiserver.rhcloud.com/data/'+req.params.className,
            headers:{
                "Api-Key": apiKey,
                "Api-App": "app",
                "Api-User": "user"
            }
        }
        , function (error, response, body) {
            if(response.statusCode == 200){
                res.end(body)
            }else {
                res.end(error);
            }
        }
    );
};

exports.getId = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    request(
        { method: 'GET',
            url: 'http://serv1-farmathapiserver.rhcloud.com/data/'+req.params.className+'/'+req.params.id,
            headers:{
                "Api-Key": apiKey,
                "Api-App": "app",
                "Api-User": "user"
            }
        }
        , function (error, response, body) {
            if(response.statusCode == 200){
                res.end(body)
            }else {
                res.end(error);
            }
        }
    );

};

exports.post = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header("api-key");

    request(
        { method: 'POST',
            url: 'http://serv1-farmathapiserver.rhcloud.com/data/'+req.params.className,
            headers:{
                "Api-Key": apiKey,
                "Api-App": "app",
                "Api-User": "user"
            },
            form:req.body
        }
        , function (error, response, body) {
            if(response.statusCode == 200){
                res.end(body)
            }else {
                res.end(error);
            }
        }
    );
};

exports.put = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    request(
        { method: 'PUT',
            url: 'http://serv1-farmathapiserver.rhcloud.com/data/'+req.params.className + '/'+req.params.id,
            headers:{
                "Api-Key": apiKey,
                "Api-App": "app",
                "Api-User": "user"
            },
            form:req.body
        }
        , function (error, response, body) {
            if(response.statusCode == 200){
                res.end(body)
            }else {
                res.end(error);
            }
        }
    );
};

exports.delete = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var apiKey = req.header('api-key');

    request(
        { method: 'DELETE',
            url: 'http://serv1-farmathapiserver.rhcloud.com/data/'+req.params.className+'/'+req.params.id,
            headers:{
                "Api-Key": apiKey,
                "Api-App": "app",
                "Api-User": "user"
            }
        }
        , function (error, response, body) {
            if(response.statusCode == 200){
                res.end(body)
            }else {
                res.end(error);
            }
        }
    );

};