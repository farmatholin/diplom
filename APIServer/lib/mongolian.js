var Mongolian = require("mongolian");
var config = require('../config');

var mongol = new Mongolian(config.get('mongolian:uri')
                           + config.get('mongolian:username') + ":"
                           + config.get('mongolian:password') + "@"
                           + config.get('mongolian:server') + ":"
                           + config.get('mongolian:port'));

module.exports = mongol;

//var server = new Mongolian("mongo://username:password@mongo.example.com:12345/database")