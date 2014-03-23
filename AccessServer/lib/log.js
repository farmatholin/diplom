var winston = require('winston');
var ENV = process.env.NODE_ENV;

// Логгер,
//TODO: перенастроить логгер
function getLogger(module) {

  // получение имени файла
  var path = module.filename.split('/').slice(-2).join('/');

  // вернуть логгер для этого файла
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: (ENV == 'development') ? 'debug' : 'error',
        label: path
      })
    ]
  });
}

module.exports = getLogger;