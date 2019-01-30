/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const handler = (err, req, res, next) => {
  let code = 400;
  let message = 'Internal Server Error';
  if(err instanceof HttpError) {
    code = err.code;
    message = err.message;
  } else if(err.name === 'CastError' || err.name === 'ValidationError') {
    code = 400;
    message = err.message;
  } else if(process.env.NODE_ENV !== 'production') {
    message = err.message;
    console.log(err);
  }
  res
    .status(code)
    .send({ error: message });
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
