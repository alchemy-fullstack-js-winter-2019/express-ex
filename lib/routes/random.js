const { Router } = require('express');
const ronSwanson = require('../middleware/ronSwanson');

module.exports = Router()
  .get('/random', ronSwanson, (req, res) => {
    const { quote } = req.quote;
    res.send(quote);
  });

  
