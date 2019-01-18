const { Router } = require('express');
const Tweets = require('../../lib/models/Tweets');
const parse = require('url');


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
  .get('/', (req, res) => {
    Tweets.find((err, listOfTweets) => {
      res.send(listOfTweets);
    });
  })
  .get('/:id', (req, res) => {
    Tweets.findById(req.params.id, (err, foundTweet) => {
      res.send(foundTweet);
    });
  });
