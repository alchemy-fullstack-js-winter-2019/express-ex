const handler = (err, req, res, next) => {
  let code = 500;
  let message = 'Internatl Server Error';
  if(err instanceof HttpError) {
    code = err.code;
    message = err.message;
  } else if(err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ error: err.message });
  } else if(process.env.NODE_ENV !== 'production') {
    res.send({ error: err.message });
    console.log(err);
  }

  res
    .status(500)
    .send({ error: 'INTERNAL SERVER ERROR' });
  next();
};

class HttpError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = {
  handler
};