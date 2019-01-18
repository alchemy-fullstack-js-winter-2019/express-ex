const Router = require('express').Router;
const Tweets = require('../../lib/models/Tweets');

module.exports = Router()
  .post('/', (req, res) => {
    // console.log(req.body);
    const { handle, text } = req.body;
    Tweets.create({
      handle,
      text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })
  .get('/:id', (req, res) => {
    const _id = req.params.id;
    Tweets.findById(_id, (err, tweet) => {
      res.send(tweet);
    });
  })
  .get('/', (req, res) => {
    Tweets.find((err, tweets) => {
      res.send(tweets);
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
  });

