module.exports = (req, res, next) => {
  res.status = 404;
  res.end('Not Found');
  next();
};
