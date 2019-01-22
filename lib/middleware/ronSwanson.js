const getRandomQuote = require('../services/ronSwansonApi');

module. exports = (req, res, next) => {
  req.quote(getRandomQuote);
};
