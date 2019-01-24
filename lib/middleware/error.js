/* eslint-disable no-console */
const handler = (err, req, res, next) => {
  let code = 500;
  let message = 'Internal Server Error';
  if(err instanceof HTTPError) {
    code = err.code;
    message = err.message;
  } else if(err.name === 'CastError' || err.name === 'Validation Error') {
    code = 400;
    message = err.message;
  }
  else if(process.env.NODE_ENV !== 'PRODUCTION') {
    message = err.message;
    console.log(err);
  }
  res.status(code).send({ error: message });
  next();
};

class HTTPError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = {
  handler,
  HTTPError
};
