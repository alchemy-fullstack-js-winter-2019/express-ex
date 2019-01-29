const { Router } = require('express');
const Tags = require('../models/Tags');

module.exports = Router()
  .post('/', (req, res) => {
    const { group, tag } = req.body;
    Tags.create({ group, tag }, (err, createdTag) => {
      res.send(createdTag);
    });
  });