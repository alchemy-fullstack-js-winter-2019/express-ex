module.exports = (req, res, next) => {
  res.statusCode = 404;
  /* eslint-disable-next-line */
  res.status(404).send({ error: 'Not Found'});
  next();
};
