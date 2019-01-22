const getRandomQuote = require('../services/ronSwansonApi');

module.exports = (n, req, res, next) => {
  req.quote = getRandomQuote(1);
  req.send(req.quote);
  next();
};
