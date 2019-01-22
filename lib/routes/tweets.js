const { Router } = require('express');
const Tweets = require('../models/Tweets');

module.exports = Router()
  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweets.create({ 
      handle,
      text 
    }, (err, createdTweet) => {
      if(err) res.error(err);
      else {
        res.send(createdTweet);
      }
    });
  })

  .get('/:id', (req, res) => {
    Tweets.findById(req.params.id, (err, tweet) => {
      if(err) res.error(err);
      else {
        res.send(tweet);
      }
    });
  })

  .put('/:id', (req, res) => {
    const _id = req.params.id;
    const { handle, text } = req.body;
    Tweets.findByIdAndUpdate(_id, {
      handle,
      text
    }, (err, updatedTweet) => {
      if(err) res.error(err);
      else {
        res.send(updatedTweet);
      }
    });
  })

  .delete('/:id', (req, res) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      if(err) res.error(err);
      else {
        res.send(deletedTweet);
      }
    });
  })
  
  .get('/', (req, res) => {
    Tweets.find((err, tweets) => {
      if(err) res.error(err);
      else {
        res.send(tweets);
      }
    });
  });
