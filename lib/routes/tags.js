const { Router } = require('express');
const Tags = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res) => {
    const { name } = req.body;
    Tags.create({ name }, (err, createdTag) => {
      res.send(createdTag);
    });
  });
