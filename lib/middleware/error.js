const handler = (err, req, res, next) => {
  res.status(500).send({ error: 'Internal Server Error' });
  // next();
};
class HttpError extends Error {
  constructor(code, message){
    super();
    this.code = code;
    this.message = message;
  }
  if(err instanceof HttpError) {
    res.send(err.code)
  }
}

module.exports = {
  handler
};
