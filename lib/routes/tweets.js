const { Router } = require('express');
const Tweets = require('../models/Tweets');

// const errOrStringify = (err, obj) => {
//   if(err) {
//     res.statusCode = 400;
//     res.send(err);
//   } else {
//     res.send(obj);
//   }
// };

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
    Tweets.findById(req.params.id, (err, tweet) => {
      res.send(tweet);
    });
  })
  .put('/:id', (req, res) => {
    Tweets.findByIdAndUpdate(req.params.id, { handle: 'yogurt420', text: 'yolo!' }, (err, tweet) => {
      res.send(tweet);
    });
  })
  .delete('/:id', (req, res) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      res.send(deletedTweet);
    });
  })
  .get('/', (req, res) => {
    Tweets.find((err, tweets) => {
      res.send(tweets);
    });
  });
