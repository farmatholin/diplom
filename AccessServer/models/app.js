var async = require('async');
var util = require('util');
var HttpError = require('../error').HttpError;

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

function schemasSchema(name){
    this.name = name;
    this.fields = [fieldSchema];


}

function fieldSchema(fieldName, fieldType){
    this.fieldName = fieldName;
    this.fieldType = fieldType;
}

// TODO: перенастройка app
/*
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

*/
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
    schemas: [schemasSchema]
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
                callback(new HttpError(404, "No application"));
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
            if(doc) return(callback({error:"you already have app with same name"}));

            var app = new App();
            app.name = postData.name;
            app.user = userId;
            app.dataServer = 'http://localhost:8081';
            app.save(function(err) {
                if (err) return callback(err);
                callback(null, app);
            });
        }
    ],callback)
};

schema.statics.AppDelete = function(id, callback){
    callback(id);
}

/// Добавление схемы данных
schema.statics.AddSchema = function(apiKey, postData, callback){

    var App = this;

    async.waterfall([
        function (callback) {
            App.findOne({_id: apiKey}, callback);
        },
        function (app, callback) {
            if (app) {

                // Создаём новую схему
                var schema = new schemasSchema({name:postData.schemaName});

                // Добавляем стандартные поля
                schema.fields.push([
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
                ]);

                // Добовляем переданные поля
                postData.schemasFields.forEach(function(item, index, arr){
                    schema.fields.push({
                        fieldName: item.fieldName,
                        fieldType: item.fieldType
                    });
                });

                app.schemas.push(schema);

                app.save(function(err){
                    if (err) return callback(err);
                    callback(null, app);
                });
            } else {
                callback(new HttpError(404, "No application"));
            }
        }
    ], callback);
};

schema.statics.AddField = function(apiKey, postData, callback){
    async.waterfall([
        function (callback) {
            App.findOne({_id: apiKey}, callback);
        },
        function (app, callback) {
            if (app) {
                callback(null,app)
            } else {
                callback(new HttpError(404, "No application"));
            }
        }
    ], callback);
};

exports.App = mongoose.model('App', schema);