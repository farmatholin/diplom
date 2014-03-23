var nconf = require('nconf');
var path = require('path');

nconf.argv()
  .env()
  .file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;

/*
TODO: Для сервака publish
 {
 "port": 3000,
 "mongolian": {
 "uri": "mongodb://",
 "username":"admin",
 "password":"WJ5-g17l-vAV",
 "server":"127.2.252.130",
 "port":"27017"
 }
 }
*/