module.exports = (err, req, res, next) => {
  if(err) {
    res.statusCode = 500;
    res.send('{ error: Internal Server Error }');
  }
  next();
};
