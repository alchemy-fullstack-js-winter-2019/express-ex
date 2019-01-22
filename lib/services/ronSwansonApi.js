const request = require('superagent');

module.exports = n => {
  return request
    .get(`https://ron-swanson-quotes.herokuapp.com/v2/quotes`)
    .then(res => {
      
    });
};
