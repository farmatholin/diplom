exports.getIndex = function(req, res, next){
    res.render('doc/index');
}

exports.getiOS = function(req, res, next){
    res.render('doc/ios')
}

exports.getAndroid = function(req, res, next){
    res.render('doc/android')
}

exports.getRest = function(req, res, next){
    res.render('doc/rest')
}