const { Router } = require('express');

module.exports = Router()
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  })
  .get('/', (req, res) => {
    res.end('root');
  });
// .post()
