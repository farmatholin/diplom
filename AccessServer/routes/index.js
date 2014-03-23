//Модуль роутинга

module.exports = function(app) {

    // Функции на получение данных
    app.get('/data/:className/:id', require('./responseGet').getId);
    app.get('/data/:className', require('./responseGet').get);

    //функции на отправку данных
    app.post('/data/:className', require('./responsePost').post);

    //фунункциина обновление данных
    app.put('/data/:className/:id', require('./response').put);

    // функции удаления данных
    app.delete('/data/:className/:id', require('./response').delete);

    /* database */
    app.post('/db/', require('./db').post);
    app.delete('/db/', require('./db').delete);


    /////// AppsFunction
    app.post('/app/:userId', require('./app/appCreate').post);
};
