/* eslint-disable no-console */
const { Router } = require('express');
const Tweet = require('../models/Tweet');


module.exports = Router() 
  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweet.create({
      handle, 
      text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })
  .get('/:id', (req, res) => {
    Tweet.findById(req.params.id, (err, foundTweet) => {
      res.send(foundTweet);
    });
  })
  .get('/', (req, res) => {
    Tweet.find((err, listOfTweets) =>
      res.send(listOfTweets));
  })
  .put('/:id', (req, res) => {
    const { handle, text } = req.body;
    Tweet.findByIdAndUpdate(req.params.id, { handle, text }, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
  })
  .delete('/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, (err, deletedTweet) => 
      res.send(deletedTweet)
    );
  });

