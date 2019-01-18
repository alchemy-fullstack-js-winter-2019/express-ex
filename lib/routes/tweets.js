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
  .get('/', (req, res) => {
    Tweets.find((err, listOfTweets) => {
      res.send(listOfTweets);
    });
  });


