var request = require('request');
var config = require('../config');
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require('async');

exports.get = function(req, res, next){
    var apiKey = req.params.id;
    var name = req.params.name;

    var accessServer = config.get('accessServer');
    request(
        { method: 'GET',
            url: accessServer + '/data/' + name,
            headers: {
                "Api-Key": apiKey
            }
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                res.send(body);
            } else {
                return next(error);
            }
        }
    );
};


exports.delete = function(req, res, next){
    var apiKey = req.params.id;
    var name = req.params.name;

    var ids = req.body.data;
    if(ids){
        var accessServer = config.get('accessServer');
        ids.forEach(function(id){
            request(
                { method: 'DELETE',
                    url: accessServer + '/data/' + name + '/' + id,
                    headers: {
                        "Api-Key": apiKey
                    }
                },
                function (error, response, body) {
                    if (response.statusCode == 200) {
                        //res.send(body);
                    } else {
                        return next(error);
                    }
                }
            );
        });
    }

    res.send({});
};