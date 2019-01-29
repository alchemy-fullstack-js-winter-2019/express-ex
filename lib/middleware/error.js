/* eslint-disable no-unused-vars */

const handler = (err, req, res, next) => {
  let code = 500;
  let message = 'internal server Error';
  if(err instanceof HttpError){
    code = err.code;
    message = err.msg;
  } else if(err.name === 'CastError' || err.name === 'ValidationError'){
    code = 400;
    message = err.message;
  } else if(process.env.NODE_ENV !== 'production') {
    message = err.message;
    console.log(err);
  }
  res
    .status(code)
    .send({ message });

};

class HttpError extends Error {
  constructor(statusCode, msg){
    super();
    this.statusCode = statusCode,
    this.msg = msg; 
  }
}

module.exports = {
  handler,
  HttpError
};
