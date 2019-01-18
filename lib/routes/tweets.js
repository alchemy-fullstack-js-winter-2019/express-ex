/* eslint-disable no-console */
const { Router } = require('express');

module.exports = Router()
  .get('/:id', (req, res) => {
    console.log(req.params);
    res.end(req.params.id);
  });

