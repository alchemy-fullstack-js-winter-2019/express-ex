const request = require('superagent');

module.exports = n => {
  getRandomQuote()
  return request
    .get(`https://ron-swanson-quotes.herokuapp.com/v2/quotes/${n}`)
    .then(res => {
      res.body;
    });
   
};
