const Router = require('express').Router;
const Tweets = require('../models/Tweet');


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
    const id = req.params.id;
    Tweets.findById(id, (err, tweet) => {
      res.send(tweet);
    });
  })
  .get('/', (req, res) => {
    Tweets.find((err, listOfTweets) => {
      res.send(listOfTweets);
    });
  })
  .put('/:id', (req, res) => {
    const id = req.params.id;
    Tweets.findByIdAndUpdate(id, req.body, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
  })
  .delete('/:id', (req, res) => {
    const id = req.params.id;
    Tweets.findByIdAndDelete(id, (err, deleteCount) => {
      res.send(deleteCount);
    });
  });


