/* eslint-disable no-console */
const handler = (err, req, res, next) => {
  let code = 500;
  let message = 'Internal Server Error';
  if(err instanceof HttpError) {
    code = err.code;
    message = err.message;
  } else if(err.name === 'CastError' || err.name === 'ValidationError') {
    code = 400;
    message = err.message;
  } else if(process.env.NODE_ENV !== 'production') {
    res.send({ error: err.message });
    console.log(err);
  }
  next();
};

class HttpError extends Error {
  constructor(code, message) {
    super();
  }
}

module.exports =  {
  handler,
  HttpError
};
