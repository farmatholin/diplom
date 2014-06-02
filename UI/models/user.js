var crypto = require('crypto');
var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    apps: [{
        _id: false,
        name: {
            type: String,
            required: true
        },
        key: {
            type: String
        },
        created: {
            type: Date,
            default: Date.now
        }
    }]
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError("Пароль неверен"));
                }
            } else {
                callback(new AuthError("Логин или пароль не верен"));
            }
        }
    ], callback);
};

schema.statics.registration = function(username, password, email, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.find({$or:[{username: username}, {email: email}]}, callback);
        },
        function(user, callback) {
            if (user.length > 0) {
                callback(new AuthError("Такой Пользователь уже существует"));
            } else {
                var user = new User({
                    username: username,
                    password: password,
                    email:email
                });
                user.save(function(err) {
                    if (err) return callback(err);
                    callback(null, user);
                });
            }
        }
    ], callback);
};

schema.methods.addApp = function(name, key, callback){
    this.apps.push({
        name:name,
        key:key
    });

    this.save(function(err){
        if(err){
            return callback(err)
        }
        callback(null, this);
    });
};

schema.methods.deleteApp = function(name, callback){

    for(var i = 0; i < this.apps.length; ++i){
        if(this.apps[i].name == name){
           this.apps.splice(i,1);
            break;
        }
    }

    this.save(function(err){
        if(err){
            return callback(err)
        }
        callback(null, this);
    });
};

exports.User = mongoose.model('User', schema);


function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;


