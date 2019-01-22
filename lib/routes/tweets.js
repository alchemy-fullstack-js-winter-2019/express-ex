const { Router } = require('express');
const Tweet = require('../models/Tweets');

module.exports = Router()

  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweet.create({
      handle,
      text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })

  .get('/:id', (req, res) => {
    Tweet.findById(req.params.id, (error, foundTweet) => {
      res.send(foundTweet);
    });
  })

  .get('/', (req, res) => {
    Tweet.find((err, tweetList) => {
      res.send(tweetList);
    });
  });
// TO DO - test not passing
// .put('/:id', (req, res) => {
//   Tweet.findByIdAndUpdate(req.params.id, req.body, (error, updatedTweet) => {
//     res.end(updatedTweet);
//   });
// });

  

