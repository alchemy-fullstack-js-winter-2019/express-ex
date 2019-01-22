const { getRandomQuote } = require('../services/ronSwansonApi');

module.exports = (err, req, res, next) => {
  req.quote = getRandomQuote(1);
  console.log(req.quote);
  res.send(req.quote);
  next();
};
