const Router = require('express').Router;
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {  //* request handler
    const { handle, text, _id } = req.body;
    //* new js syntax that means create all 3 consts as one object
    Tweet.create({
      handle,
      text,
      _id
    }, (err, createdTweet, next) => {
      if(err) return next(err); //* added error handling
      res.send(createdTweet); //* will stringify json auto!
    });
    //*res.end(''); - was previous method
  })

  .get('/', (req, res) => {
    Tweet.find((err, allTweets, next) => {
      if(err) return next(err);
      res.send(allTweets);
    });
  })

  .get('/:id', (req, res) => {
    Tweet.findById(req.params.id, (err, oneTweet) => {
      res.send(oneTweet);
    });
  });

