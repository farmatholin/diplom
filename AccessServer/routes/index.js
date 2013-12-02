module.exports = function(app) {

    app.get('/data/:className/:id', require('./responseGet').getId);
    app.get('/data/:className', require('./responseGet').get);

    app.post('/data/:className', require('./responsePost').post);

    app.put('/data/:className/:id', require('./response').put);

    app.delete('/data/:className/:id', require('./response').delete);

    /* database */
    app.post('/db/', require('./db').post);
    app.delete('/db/', require('./db').delete);
};
