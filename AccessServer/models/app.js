var async = require('async');
var util = require('util');
var config = require('../config');
var HttpError = require('../error').HttpError;
var AppError = require('../error').AppError;

var mongooseTypes = require('mongoose').Types;
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//Основная схема описывающая приложение
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
    schemas: [{
        _id:{
            type:String,
            require: true
        },
        name: {
            type: String,
            required: true
        },
        fields:[{
            fieldName:{
                type: String,
                required: true
            },
            fieldType: {
                type: String,
                required: true
            },
            _id: false
        }]
    }]
});

//Ключ приложения является id
schema.virtual("AppKey").get(function () {
    return this._id;
});

// Получение даннхы о приложении по API key
schema.statics.getAppData = function (apiKey, callback) {
    var App = this;
    async.waterfall([
        function (callback) {
            App.findOne({_id: apiKey}, callback);
        },
        function (app, callback) {
            if (app) {
                callback(null, app);
            } else {
                return callback(new AppError(404, "No application"));
            }
        }
    ], callback);
};

schema.statics.CreateApp = function(userId, postData, callback){
    var App = this;

    async.waterfall([
        function (callback) {
            App.findOne({user: userId, name: postData.name}, callback);
        },
        function(doc, callback){
            if(doc)
                return(callback(new AppError(409,'Application already created')));
            if(!postData.name)
                return(callback(new AppError(406, 'Cant create application without name')));

            var app = new App();

            app.name = postData.name;
            app.user = userId;
            app.dataServer = config.get('dataServer')[0].url;
            app.save(function(err) {
                if (err) return callback(err);
                callback(null, app);
            });
        }
    ],callback);
};

schema.statics.AppDelete = function(id, callback){
    var App = this;

    async.waterfall([
        function (callback) {
            App.findOne({_id: id}, callback);
        },
        function(doc, callback){
            if(!doc)
                return(callback(new AppError(404, 'Application not found')));
            var oldDoc = doc;
            doc.remove(function(err) {
                if (err) return callback(err);
                callback(null, oldDoc);
            });

        }
    ],callback);
};

/// Возвращает всё приложения юзера
schema.statics.AppGetUser = function(userId, callback){
    var App = this;

    async.waterfall([
        function (callback) {
            App.find({user: userId}, callback);
        },
        function(app, callback){
            if(!app) return(callback(new AppError(404, 'Application for this user not found')));

            callback(null, app);
        }

    ],callback);
}


/// Добавление схемы данных
schema.statics.AddSchema = function(appId, postData, callback){

    var App = this;

    async.waterfall([
        function (callback) {
            App.findOne({_id: appId }, callback);
        },
        function (app, callback) {
            if (app) {
                for(var i = 0; i < app.schemas.length; ++i){
                    if(app.schemas[i].name.toLowerCase() === postData.name.toLowerCase()){
                        return callback(new AppError(409, 'Schema already created'));
                    }
                }
                // Создаём новую схему
                var schema = {}

                schema.name = postData.name;

                // Добавляем стандартные поля
                ///// ЗАМЕНА
                schema._id = mongooseTypes.ObjectId().toString();
                schema.fields = [
                    {
                        fieldName: "dateCreate",
                        fieldType: "Date"
                    },
                    {
                        fieldName: "dateUpdated",
                        fieldType: "Date"
                    },
                    {
                        fieldName: "_id",
                        fieldType: "ObjectId"
                    }
                ];

                app.schemas.push(schema);

                app.save(function(err){
                    if (err) return callback(err);
                    callback(null, schema._id);
                });
            } else {
                callback(new AppError(404, "No application"));
            }
        }
    ], callback);
};

/// получение схемы данных
schema.statics.GetSchema = function(schemaId, callback){

    var App = this;

    async.waterfall([
        function (callback) {
            App.findOne({schemas:{$elemMatch:{_id:schemaId}}}, callback);
        },
        function (app, callback) {
            if (app) {
                for(var i = 0; i < app.schemas.length; ++i){
                    if(app.schemas[i]._id == schemaId){
                        return callback(null,app.schemas[i]);
                        //break;
                    }
                }
            } else {
                callback(new AppError(404, "No schema"));
            }
        }
    ], callback);
};

schema.statics.GetSchemas = function(id, callback){

    var App = this;

    async.waterfall([
        function (callback) {
            App.findOne({_id:id}, callback);
        },
        function (app, callback) {
            if (app) {
                var schemasData = [];
                for(var i = 0; i < app.schemas.length; ++i){
                    schemasData.push({_id: app.schemas[i]._id, name: app.schemas[i].name});
                }
                callback(null, schemasData);
            } else {
                callback(new AppError(404, "No schema"));
            }
        }
    ], callback);
};

schema.statics.AddFields = function(appId, schemaName, postData, callback){
    var App = this;
    async.waterfall([
        function (callback) {
            App.findOne({_id: appId, schemas:{$elemMatch:{name:schemaName}}}, callback);
        },
        function (app, callback) {
            if(!app) return callback(new AppError(404, 'application not found'));

            /// GПроверка на дубликат
            // TODO: Проверка на дубликат
            for(var i = 0; i < app.schemas.length; ++i){
                if(app.schemas[i].name != schemaName){
                    app.schemas[i].fields.push(postData);
                    break;
                }
            }
            app.save(function(err){
                if (err){
                    if(err.name = 'ValidationError') return callback(new AppError(406,'required fields missing'));
                    return callback(err);
                }
                callback(null, app);
            });

        }
    ], callback);
};

exports.App = mongoose.model('App', schema);