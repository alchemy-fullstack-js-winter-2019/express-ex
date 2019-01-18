const { Router } = require('express');
const Tweets = require('../models/Tweets');

module.exports = Router()
  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweets.create({ 
      handle,
      text 
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  })
  .get('/', (req, res) => {
    Tweets.find((err, tweets) => {
      res.send(tweets);
    });
  });
