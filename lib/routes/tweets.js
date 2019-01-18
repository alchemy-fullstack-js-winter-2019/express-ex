const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  })
  .get('/', (req, res) => {
    res.end(req.body);
  })
  .post('/', (req, res) => {
    Tweet.create({
      handle: req.body.handle,
      text: req.body.text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  });
