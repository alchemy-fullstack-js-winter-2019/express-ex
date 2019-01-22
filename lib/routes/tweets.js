const Router = require('express').Router;
const Tweets = require('../../lib/models/Tweets');
const { HttpError } = require('../middleware/error');

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
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Tweets.findById(_id, (err, tweet) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, `Bad Id: ${req.params.id}`));
        } else {
          return next(err);
        }
      }
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
  })
  .delete('/:id', (req, res) => {
    const _id = req.params.id;
    Tweets.findByIdAndDelete(_id, (err, obj) => {
      res.send(obj);
    });
  });

