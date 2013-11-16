var mongol = require('../lib/mongolian');
var qFunc = require('../lib/queryFunctions');
var ObjectId = require('mongolian').ObjectId
var config = require('../config');
var Url = require('url');
var exec = require("child_process").exec;

exports.post = function (req, res, next){
    
    var func  = "mongo -u "+config.get('mongolian:username')+" -p "+config.get('mongolian:password')+" "+config.get('mongolian:server')+"/admin --eval \"db.getSiblingDB('"+req.params.dbName+"').addUser('user', 'servapiuser');\""
    
    exec(func, function(err, resstd, errstd){
        res.end(resstd);
    });
}

exports.delete = function (req, res, next){
    var db = mongol.db(req.params.dbName);
    db.dropDatabase();
    res.end('{"msg":good}');
}