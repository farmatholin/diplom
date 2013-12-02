var async = require('async');
var util = require('util');
var crypto = require('crypto');
var HttpError = require('../error').HttpError;

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var fieldSchema = new Schema({
    fieldName: {
        type: String,
        required: true
    },
    fieldType: {
        type: String,
        required: true
    }
});

var schemasSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fields: [
        {
            type: fieldSchema,
            default: [
                {
                    fieldName: "dateCreate",
                    fieldType: "Date"
                },
                {
                    fieldName: "dateUpdate",
                    fieldType: "Date"
                },
                {
                    fieldName: "_id",
                    fieldType: "ObjectId"
                }
            ]
        }
    ]
});

var schema = new Schema({
    name: {
        type: String,
        require: true
    },
    user: {
        type: String,
        required: true
    },
    dataServer:{
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    shchemas: [schemasSchema]
});

schema.virtual("AppKey").get(function () {
    return this._id;
});

schema.static.getAppData(function (apiKey, callback) {
    var App = this;
    async.waterfall([
        function (callback) {
            App.findOne({_id: apiKey}, callback);
        },
        function (app, callback) {
            if (app) {
                callback(null, app);
            } else {
                callback(new HttpError(404, "No application"));
            }
        }
    ], callback);

})

exports.App = mongoose.model('App', schema);