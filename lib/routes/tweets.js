const { Router } = require('express');
const Tweets = require('../../lib/models/Tweets');


module.exports = Router()
  .put('/:id', (req, res) => {
    const { handle, text } = req.body;
    Tweets.findByIdAndUpdate(req.params.id, {
      handle,
      text
    }, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
  })
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
    if(req.params.id) {
      Tweets.findById(req.params.id, (err, foundTweet) => {
        res.send(foundTweet);
      });
    }
  })
  .delete('/:id', (req, res) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      res.send(deletedTweet);
    });
  });
