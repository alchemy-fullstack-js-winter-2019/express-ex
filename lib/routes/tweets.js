const { Router } = require('express');

module.exports = Router() 

  .post('/tweets', (req, res) => {
    res.send('post');
  })

  .put('/tweets/:id', (req, res) => {
    res.send(req.params.id);
  })

  .delete('/tweets/:id', (req, res) => {
    res.send(req.params.id);
  })

  .get('/', (req, res) => {
    res.send(res);
  })

  .get('/:id', (req, res) => {
    res.send(req.params.id);
  });
