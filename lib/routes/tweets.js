const { Router } = require('express');


module.exports = Router()
  .get('/:name', (req, res) => {
    console.log(req.params);
    res.send({ name: req.params.name });
  })
  .get('/', (req, res) => {
    res.end('root');
  })
  .post('/', (req, res) => {
    console.log(req.body);
    res.end('');
  });
