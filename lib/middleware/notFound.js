module.exports = (req, res, next) => {
  res.statusCode = 404;
  res.end(res.statusCode, 'Not Found');
  next();
};
