var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    cost:{
        type: Number,
        unique: true,
        required: true
    },
    type:{
        type: String,
        unique: true,
        required: true
    },
    moneyType:{
        type: String,
        unique: true,
        required: true
    }
});

exports.MarketItem = mongoose.model('MarketItem', schema);