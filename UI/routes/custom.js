var request = require('request');
var config = require('../config');
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.getCol = function(req, res, next){

    var accessServer = config.get('accessServer');

    request(
        { method: 'GET',
            url: accessServer + '/app/schemas/data/'+ req.params.id
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                var resBody = JSON.parse(body);
                if(resBody.length > 0){
                    req.session.colls = {};
                    req.session.colls[req.params.id] = resBody
                    res.redirect('/dashboard/app/service/custom/'+ req.params.id + '/' + resBody[0]._id);
                } else {
                    res.render('dashboard/custom', {
                        id:req.params.id,
                        appBody: null,
                        otherCol:null
                    });
                }
            } else {
                return next(error);
            }
        }
    );
};

exports.getColApp = function(req, res, next){
    var accessServer = config.get('accessServer');
    request(
        { method: 'GET',
            url: accessServer + '/app/schemas/'+ req.params.classId
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                var resBody = JSON.parse(body);
                //res.send(resBody);

                var otherCol = [];
                otherCol[0] = null;

                var len = req.session.colls[req.params.id].length;

                for(var i = 0; i < len; ++i){
                    if(req.session.colls[req.params.id][i]._id == req.params.classId){
                        otherCol[0] = req.session.colls[req.params.id][i];
                    } else {
                        otherCol.push(req.session.colls[req.params.id][i]);
                    }
                }
                res.render('dashboard/custom', {
                    id:req.params.id,
                    appBody: resBody,
                    otherCol:otherCol
                });
            } else {
                return next(error);
            }
        }
    );
};

exports.addColApp = function(req, res, next){
    var name = req.body.name;
    var accessServer = config.get('accessServer');
    request(
        { method: 'POST',
            url: accessServer + '/app/schemas/'+ req.params.id,
            form: {name: name}
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                res.send('/dashboard/app/service/custom/'+ req.params.id +'/' + body);
            } else {
                return next(error);
            }
        }
    );
};

exports.deleteColApp = function(req, res, next){

    var accessServer = config.get('accessServer');
    request(
        {
            method: 'DELETE',
            url: accessServer + '/app/schemas/'+ req.params.id +'/' + req.params.classId
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                res.send({});
            } else {
                return next(error);
            }
        }
    );
};

exports.addFieldCApp = function(req, res, next){

    var accessServer = config.get('accessServer');
    request(
        {
            method: 'POST',
            url: accessServer + '/app/schemas/field/'+ req.params.id +'/' + req.params.classId,
            form: req.body
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                res.send({});
                //больше кодов
            } else {
                return next(error);
            }
        }
    );
};

exports.deleteFieldCApp = function(req, res, next){
    var accessServer = config.get('accessServer');
    request(
        {
            method: 'DELETE',
            url: accessServer + '/app/schemas/field/'
                + req.params.id +'/'
                + req.params.classId + '/'
                + req.params.fieldName
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                res.send({});
                //больше кодов
            } else {
                return next(error);
            }
        }
    );
};