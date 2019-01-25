const HttpError = require('./HttpError');

module.exports = (err, req, res, next) => {
  if(err instanceof HttpError) {
    if(err.name === 'CastError' || err.name) res.status(400).send({ error: err.message });

    if(process.env.NODE_ENV !== 'production') {
      console.log(err);
      res.send({ error: err.message });
    }
    res.status(err.code).send({ error: err.message });
    next();
  }

  res.status(500).res.send({ error: 'Internal Server Error' });
  next();
};
