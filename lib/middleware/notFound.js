module.exports = (req, res, next) => {
    res.statusCode = 404;
    /* eslint-disable-next-line */
    console.log('Not Found, ERROR', res.statusCode);
    res.end('Route not found');
    next();

};
