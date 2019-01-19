module.exports = (req, res, next) => {
  res.statusCode = 404;
  res.end('Not Found');
  next();
};
