/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res) => {
    console.log(req.body);
    res.end('');
  })
  .get('/:id', (req, res) => {
    console.log(req.params);
    res.send({ name: req.params.name });
  })
  .get('/', (req, res) => {
    res.end('root');
  });

