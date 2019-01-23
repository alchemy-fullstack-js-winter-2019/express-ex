const Router = require('express'); //*was .Router
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {  //* request handler
    const { handle, text } = req.body; //*rm _id
    //* new js syntax that means create all 3 consts as one object
    Tweet.create({
      handle,
      text, //*rm _id
    }, (err, createdTweet) => {
      if(err) return next(err); //* added error handling
      res.send(createdTweet); //* will stringify json auto!
    });
    //*res.end(''); - was previous method
  })

  .get('/', (req, res, next) => {
    Tweet.find((err, listOfTweets) => {
      if(err) return next(err);
      res.send(listOfTweets);
    });
  })

  .get('/:id', (req, res, next) => {
    Tweet.findById(req.params.id, (err, tweet) => {
      if(err) {
        return next(err);
      }
      res.send(tweet);
    });
  })

  .put('/:id', (req, res, next) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body, (err, updated1) => {
      if(err) {
        return next(err);
      }
      res.send(updated1);
    });
  });

