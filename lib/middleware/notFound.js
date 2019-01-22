module.exports = (req, res, next) => {
  res.statusCode(404).send({ error: 'Not Found' });
  next();
};
