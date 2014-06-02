exports.getIndex = function(req, res, next){
    res.render('presentation/index');
}

exports.getAbout = function(req, res, next){
    res.render('presentation/about');
}

exports.getDownload = function(req, res, next){
    res.render('presentation/download');
}