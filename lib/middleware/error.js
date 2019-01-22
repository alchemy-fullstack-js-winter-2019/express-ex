/* eslint-disable no-console */
const handler = (err, req, res, next) => {

};

module.exports = (err, req, res, next) => {
  res.statusCode = 500;
  res.end({ error: 'Internal Server Error' });
  next();
};
