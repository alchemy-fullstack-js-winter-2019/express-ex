const { Router } = require('express');
const Tags = require('../models/Tags');

module.exports = Router()

  .post('/', (req, res) => {
    const { tag } = req.body;
    Tags.create({ tag }, (err, createdTag) => {
      res.send(createdTag);
    });
  })

  .get('/', (req, res) => {
    Tags.find((err, allTags) => {
      res.send(allTags);
    });
  });
