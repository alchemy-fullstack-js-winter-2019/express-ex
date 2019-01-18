const { Router } = require('express');

module.exports = Router()
  
  .post('/', (req, res) => {
    console.log(req.body);
    res.end('');
  })
  .get('./:id', (req, res) => {
    res.send({ name:req.params.name });
  })
  .get('/:id', (req, res) => {
    res.end('root'); 
  });
