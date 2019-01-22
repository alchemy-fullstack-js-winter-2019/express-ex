const getRandomQuote = require('../services/ronSwansonApi');

module.exports = (n, req, res, next) => {
  req.quote = getRandomQuote(1);
  res.send(res.quote);
  next();
};
