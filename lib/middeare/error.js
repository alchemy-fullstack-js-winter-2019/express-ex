
module.exports = (req, res, next) => {
  res.status = 500;
  res.end('Internal Server Error');
  next();
};
