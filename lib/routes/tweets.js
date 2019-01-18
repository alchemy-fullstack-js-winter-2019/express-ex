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
  .get('/', (req, res) => {
    Tweets.find((err, tweets) => {
      res.send(tweets);
    }, (err) => {
      res.send(err);
    });
  })
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  });


