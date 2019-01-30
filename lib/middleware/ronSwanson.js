const { getQuote } = require('../services/ronSwansonApi');


module.exports = (req, res, next) => {
  getQuote(1)
    .then(req.quote);
  res.end(req.quote);
  next();
};
