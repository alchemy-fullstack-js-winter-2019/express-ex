const { Router } = require('express');
const Tweets = require('../models/Tweets');
//QUESTIONS: when is req.params needed?
//Answ: req.params.routename makes it so that we dont have to define everysingle route that gets made up. for example tweets/randomeidoftweet

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
  .get('/:id', (req, res) => {
    Tweets.findById(req.params.id, (err, foundTweet) => {
      res.send(foundTweet);
    });
  })

  .put('/:id', (req, res) => {
    Tweets.findByIdAndUpdate(req.params.id, req.body, (err, updateTweet) => {
      res.send(updateTweet);
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

 

