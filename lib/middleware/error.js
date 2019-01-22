
module.exports = (req, res, next) => {
  res.status = 500;
  res.end({ error: 'Internal Server Error' });
  next();
};
