module.exports = (req, res, next) => {
  res.status = 404;
  res.send('Not Found');
  next();
};
