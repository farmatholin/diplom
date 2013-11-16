module.exports = function (app) {
    
    app.get('/data/:className/:id', require('./response').getId);
    app.get('/data/:className', require('./response').get);

    app.post('/data/:className', require('./response').post);

    app.put('/data/:className/:id', require('./response').put);
   
    app.delete('/data/:className/:id', require('./response').delete);
   
    /* database */
    app.post('/db/:dbName', require('./db').post);
    app.delete('/db/:dbName', require('./db').delete);

}
