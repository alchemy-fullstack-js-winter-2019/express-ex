const Router = require('express').Router;
const Tweet = require('../models/Tweet');
//const Tag = require('/lib/models/Tag');

module.exports = Router()
  .post('/', (req, res) => {  // request handler
    const { handle, text } = req.body;
    // new js syntax that means create both consts as one object
    Tweet.create({
      handle,
      text
    }, (err, createdTweet) => {
      res.Send(createdTweet); // will stringify json auto!
    });
    res.end('');
  })

// .get('/', (req, res) => { //whatever
//   Tweet.find((err, listOfTweets) => {
//     res.send(listOfTweets);
//   });    //ryan's help - get/tweets
// })

//.put('/:id', (req, res) =? {
//   Tweet.findByIdAndUpdate(req.params.id, req.body, (err, updated1 => {
//   }))
// })   //ryan's help

  .get('/:id', (req, res) => {
    Tweet.findById(req.params.id, (err, oneTweet) => {
      res.send(oneTweet);
    });
  });

// .get('/tweets', (req, res) => {
//   //console.log(req.tweets);
//   res.end(req.params.tweets);
// });

// .get('/tweets/:id', (req, res) => {
//   //console.log(req.id);
//   res.end(req.params.id);
// })

// .delete('/tweets/:id', (req, res) => {
//   //console.log(req.id);
//   res.removeHeader(req.params.id);
// });


