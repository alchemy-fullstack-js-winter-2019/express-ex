module.exports = (err, req, res, next) => {
  res.statusCode = 500;
  res.send({ error: 'Internal Server Error' });
  next();
};
