var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if(err) throw err;

    db.getSiblingDB("testAaaa");
})