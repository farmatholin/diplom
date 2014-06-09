//Модуль роутинга
module.exports = function(app) {

    app.options('/*', function(req, res, next){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', "DELETE, PUT, OPTIONS, GET, POST")
        res.setHeader('Access-Control-Allow-Headers',
            "Overwrite, Destination, Content-Type, Depth, User-Agent, X-File-Size," +
                " X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, api-key, Access-Control-Allow-Origin, Origin"
        );
        res.end();
    });

    // Функции на получение данных
    app.get('/data/:className/:id', require('./responseGet').getId);
    app.get('/data/:className', require('./responseGet').get);

    //функции на отправку данных
    app.post('/data/:className', require('./responsePost').post);

    //фунункциина обновление данных
    app.put('/data/:className/:id', require('./response').put);

    // функции удаления данных
    app.delete('/data/:className/:id', require('./response').delete);
    /* database  used in app funcs*/
   // app.post('/db/', require('./db').post);
    //app.delete('/db/', require('./db').delete);


    /////// AppsFunction
    app.get('/app/user/:userId', require('./app/appGet').getUser);
    app.get('/app/:appId', require('./app/appGet').get);
    app.post('/app/:userId', require('./app/appCreate').post);
    app.delete('/app/:appId', require('./app/appDelete').delete);

    ///// appsSchemas functions
    app.get('/app/schemas/:schemaId', require('./appSchema/appGetSchema').get);
    app.get('/app/schemas/data/:id', require('./appSchema/appGetSchema').getSchemas);
    app.delete('/app/schemas/:appId/:schemaId', require('./appSchema/appDeleteSchema').delete);

    app.post('/app/schemas/:appId', require('./appSchema/appAddSchema').post);

    //Fields functions
    app.post('/app/schemas/field/:appId/:schemaId', require('./appSchema/appAddFields').post);
    app.delete('/app/schemas/field/:appId/:schemaId/:fieldName', require('./appSchema/appDeleteField').delete);
};
