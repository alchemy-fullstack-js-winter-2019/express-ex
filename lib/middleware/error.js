const handler = (err, req, res, next) => {
  res.status(500).send({ error : 'Internal Server Error' });
  next();
};

module.exports = {
  handler
};
