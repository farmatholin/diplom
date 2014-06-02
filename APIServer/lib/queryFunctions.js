var reg = new RegExp('["](lt|lte|gt|gte|ne|in|nin)["]','g');
var regInt = new RegExp('[:]["](\\d*)["]','g');

var ObjectId = require('mongolian').ObjectId

// Адская либа для создания запростов

exports.queryCreator = function(query){
    query = JSON.stringify(query).replace(reg,'"$$$1"');
    query = query.replace(regInt,':$1');
    return JSON.parse(query);
};

exports.queryInsertCreator = function(bodyObject){
    bodyObject = JSON.stringify(bodyObject).replace(regInt,':$1');
    bodyObject = JSON.parse(bodyObject);
    if(!bodyObject._id){
        bodyObject._id = new ObjectId().toString('hex');
    }
    bodyObject.dateCreate = new Date().getTime();
    bodyObject.dateUpdated = new Date().getTime();

    return bodyObject;
}

exports.queryPutCreator = function(object){
    object = JSON.stringify(object).replace(regInt,':$1');
    object = JSON.parse(object);
    object.dateUpdated = new Date().getTime();

    return object;
}