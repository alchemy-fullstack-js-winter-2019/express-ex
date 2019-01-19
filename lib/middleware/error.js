module.exports = (req, res, next) => {
  res.statusCode = 500;
  res.end('Internal Server Error');
  next();
};
