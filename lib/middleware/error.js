module.exports = (req, res, next) => {
    res.status = 500;
    /* eslint-disable-next-line */
    console.log({ error: 'Internal Server Error' }, res.statusCode);
    res.end({ error: 'Internal Server Error' });
    next();
};
