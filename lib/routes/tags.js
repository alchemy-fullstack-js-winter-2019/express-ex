const { Router } = require('express');
const Tags = require('../models/Tags');

module.exports = Router()

  .post('/', (req, res) => {
    console.log('HERERE!!!');
    const { tag } = req.body;
    Tags.create({ tag }, (err, createdTag) => {
      res.send(createdTag);
    });
  });
