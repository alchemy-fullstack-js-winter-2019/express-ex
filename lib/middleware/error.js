const handler = (err, req, res, next) => {
  let code = 500;
  let message = 'Internal Server Error';
  if(err instanceof HttpError) {
    code = err.code;
    message = err.message;
  }
  res.status(code)
    .send({ error: message });

};

class HttpError extends Error{
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }

}

module.exports = {
  handler,
  HttpError
};
