/* eslint-disable no-console */
module.exports = (req, res, next) => {
  res.statusCode = 404;
  console.log(res.statusCode);
  next();
};
