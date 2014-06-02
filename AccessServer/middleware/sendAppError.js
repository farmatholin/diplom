module.exports = function (req, res, next) {
    res.sendAppError = function (error) {
        res.status(error.status);
        res.send({
            msg:error.message
        });
    };
    next();

};