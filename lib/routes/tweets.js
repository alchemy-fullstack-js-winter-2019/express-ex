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
    Tweets.findById(req.params.id, (err, tweet) => {
      res.send(tweet);
    });
  })
  .put('/:id', (req, res) => {
    const _id = req.params.id;
    const { handle, text } = req.body;
    Tweets.findByIdAndUpdate(_id, {
      handle,
      text
    }, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
  })
  .delete('/:id', (req, res) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      res.send(deletedTweet);
    });
  })
  .get('/', (req, res) => {
    Tweets.find((err, tweets) => {
      res.send(tweets);
    });
  });
