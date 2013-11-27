var config = require('../config');
var Url = require('url');
var request = require('request');

exports.post = function (req, res, next){
    request(
        { method: 'POST',
            url: 'http://serv1-farmathapiserver.rhcloud.com/db/'+req.params.dbName,
        }
        , function (error, response, body) {
            if(response.statusCode == 200){
                res.end(body)
            }else {
                res.end(error);
            }
        }
    );
}

exports.delete = function (req, res, next){
    request(
        { method: 'DELETE',
            url: 'http://serv1-farmathapiserver.rhcloud.com/db/'+req.params.dbName,
        }
        , function (error, response, body) {
            if(response.statusCode == 200){
                res.end(body)
            }else {
                res.end(error);
            }
        }
    );
}