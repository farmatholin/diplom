var mongol = require('../lib/mongolian');
var qFunc = require('../lib/queryFunctions');
var ObjectId = require('mongolian').ObjectId
var config = require('../config');
var Url = require('url');
var exec = require("child_process").exec;

exports.get = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    // Получение всех параметров из хедера
    var apiKey = req.header("api-key");
    var apiApp = req.header("api-app");
    var apiUser = req.header("api-user");

    //Test
    //Полуение ДБ в которой храниться всё добро
    var dbName =  apiApp + apiUser + apiKey.substring(apiKey.length-5,apiKey.length)
    var db = mongol.db(dbName);
    //Test
    //var db = mongol.db('mongol_test');

    // Авторизация
    db.auth("user","servapiuser");

    //получение данных
    var collection = db.collection(req.params.className);
    var response = [];
    var url = Url.parse(req.url);
    if (!url.query) {
        collection.find().forEach(function (doc) {
            response.push(doc);
        }, function (err) {
            res.end(JSON.stringify(response));
        });
    } else {
        var qFind = qFunc.queryCreator(req.query);
        collection.find(qFind).forEach(function (doc) {
            response.push(doc);
        }, function (err) {
            res.end(JSON.stringify(response));
        });
    }
};

exports.getId = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var apiKey = req.header("api-key");
    var apiApp = req.header("api-app");
    var apiUser = req.header("api-user");

    //Test
    var dbName =  apiApp + apiUser + apiKey.substring(apiKey.length-5,apiKey.length)
    var db = mongol.db(dbName);
    db.auth("user","servapiuser");
    //Test
    //var db = mongol.db('mongol_test');

    var collection = db.collection(req.params.className);
    collection.findOne({_id:req.params.id}, function (err, doc) {
        res.send(doc);
    });

};

exports.post = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var apiKey = req.header("api-key");
    var apiApp = req.header("api-app");
    var apiUser = req.header("api-user");

    //Test
    var dbName =  apiApp + apiUser + apiKey.substring(apiKey.length-5,apiKey.length)
    var db = mongol.db(dbName);
    //Test
    //var db = mongol.db('mongol_test');

    db.auth("user","servapiuser");
    var collection = db.collection(req.params.className);
    console.log(req.body);
    var objToInsert = qFunc.queryInsertCreator(req.body);

    collection.insert(objToInsert, function (err, doc) {
        console.log(arguments);
        res.end(JSON.stringify(doc));
    });
};

exports.put = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var apiKey = req.header("api-key");
    var apiApp = req.header("api-app");
    var apiUser = req.header("api-user");

    //Test
    var dbName =  apiApp + apiUser + apiKey.substring(apiKey.length-5,apiKey.length)
    var db = mongol.db(dbName);
    //Test
    //var db = mongol.db('mongol_test');

    db.auth("user","servapiuser");
    
    var collection = db.collection(req.params.className);
    var upItem = qFunc.queryPutCreator(req.body);
    collection.update({_id:req.params.id},{ $set : upItem }, function(err, doc){
        collection.findOne({_id:req.params.id}, function (err, doc) {
            res.end(JSON.stringify(doc));
        });
    });

};

exports.delete = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var apiKey = req.header("api-key");
    var apiApp = req.header("api-app");
    var apiUser = req.header("api-user");

    //Test
    var dbName =  apiApp + apiUser + apiKey.substring(apiKey.length-5,apiKey.length)
    var db = mongol.db(dbName);
    //Test
    //var db = mongol.db('mongol_test');

    db.auth("user","servapiuser");
    
    var collection = db.collection(req.params.className);

    collection.remove({_id:req.params.id},function(err){
        res.end()
    })
};