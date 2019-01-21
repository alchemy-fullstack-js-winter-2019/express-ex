module.exports = (err, req, res, next) => {
  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  res.end({ error: 'Internal Server Error' });
  next();
};
