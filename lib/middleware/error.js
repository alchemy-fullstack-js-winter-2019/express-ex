/* eslint-disable no-console */
module.exports = (req, res, next) => {
  res.statusCode = 500;
  res.end({ error: 'Internal Server Error' });
  next();
};
