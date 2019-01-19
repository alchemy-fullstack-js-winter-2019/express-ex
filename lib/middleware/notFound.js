module.exports = (req, res, next) => {
    res.statusCode = 404;
    console.log('Not Found, ERROR', res.statusCode);
    res.end('Route not found');
    next();

};
