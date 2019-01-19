module.exports = (req, res, next) => {
  res.statusCode = 404;
  /* eslint-disable-next-line */
  res.end(res.statusCode);
  next();
};
