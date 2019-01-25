const { Router } = require('express');
const Tweets = require('../models/Tweets');
const { HttpError } = require('../middleware/error');
//QUESTIONS: when is req.params needed?
//Answ: req.params.routename makes it so that we dont have to define everysingle route that gets made up. for example tweets/randomeidoftweet

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, text } = req.body;
    Tweets.create({ 
      handle,
      text
    }, (err, createdTweet) => {
      if(err) return next(err);
      res.send(createdTweet);
    });
  })
  .get('/:id', (req, res, next) => {
    Tweets.findById(req.params.id, (err, foundTweet) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, `Bad Id: ${req.params}`));
        } else {
          return next(err);
        }
      }
      res.send(foundTweet);
    });
  })

  .put('/:id', (req, res, next) => {
    const { handle, text } = req.body;
    Tweets.findByIdAndUpdate(req.params.id,
      { handle, text },
      (err, updated) => {
        if(err) return next(err);
        res.send(updated);
      });
  })

  .delete('/:id', (req, res) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deleteTweet) => {
      res.send(deleteTweet);
    });
  })
  
  .get('/', (req, res) => {
    Tweets.find((err, allTweets) => {
      res.send(allTweets);
    });
  });

 

