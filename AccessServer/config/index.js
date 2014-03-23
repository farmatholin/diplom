var nconf = require('nconf');
var path = require('path');

//Тут у нас создание конфига
nconf.argv()
  .env()
  .file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;