var checkAuth = require('../middleware/checkAuth');

module.exports = function (app) {
    // Главная страница
    app.get('/', require('./presentation').getIndex);
    app.get('/about', require('./presentation').getAbout);
    app.get('/downloads', require('./presentation').getDownload);


    // Доки
    app.get('/doc', require('./doc').getIndex);
    app.get('/doc/ios', require('./doc').getiOS);
    app.get('/doc/android', require('./doc').getAndroid);
    app.get('/doc/rest', require('./doc').getRest);

    //Панель Управления
    app.get('/dashboard', checkAuth, require('./dashboard').getIndex);
    app.get('/dashboard/login', require('./dashboard').getLogin);
    app.get('/dashboard/registration', require('./dashboard').getReg);
    //Пост запросы
    app.post('/dashboard/login', require('./dashboard').postLogin);
    app.post('/dashboard/logout', require('./dashboard').postLogout);
    app.post('/dashboard/registration', require('./dashboard').postReg);

    //Сюда идут запросы на приложения

    //Создание
    app.get('/dashboard/app/add', checkAuth, require('./dashboard').addApp);
    app.post('/dashboard/app/add', checkAuth, require('./dashboard').addAppPost);

    //Редактирование
    app.get('/dashboard/app/edit/:id', checkAuth, require('./dashboard').editApp);
    app.post('/dashboard/app/edit/:id', checkAuth, require('./dashboard').editAppPost);
    // удалить
    app.get('/dashboard/app/delete/:id', checkAuth, require('./dashboard').deleteApp);

    // Получение приложения кастомный объект

    //Работа с классами

    ///Получение всех классов
    app.get('/dashboard/app/service/custom/:id', checkAuth, require('./custom').getCol);

    // Получение одного класса
    app.get('/dashboard/app/service/custom/:id/:classId', checkAuth, require('./custom').getColApp);

    // Добавить Класс
    app.post('/dashboard/app/service/custom/:id', checkAuth, require('./custom').addColApp);

    // Удалить класс
    app.delete('/dashboard/app/service/custom/:id', checkAuth, require('./custom').deleteColApp);

    ///Работа с полями
    app.post('/dashboard/app/service/custom/field/:id/:classId', checkAuth, require('./custom').addFieldCApp);
    app.put('/dashboard/app/service/custom/field/:id/:classId', checkAuth, require('./custom').putFieldCApp);
    app.delete('/dashboard/app/service/custom/field/:id/:classId', checkAuth, require('./custom').deleteFieldCApp);


    ///// Для работы Аjax
    app.get('/dashboard/app/service/ajax/custom/:id/:name', require('./ajax').get);
    app.delete('/dashboard/app/service/ajax/custom/:id/:name', require('./ajax').delete);

    ///// Пока всё.
}