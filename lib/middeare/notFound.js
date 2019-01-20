
module.exports = (req, res, next) => {
  res.status = 404;
  res.end('NOT FOUND');
  next();
};
