const { Router } = require('express');
const Tweet = require('../models/Tweets');
// const { HttpError } = require('../middleware/error');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { handle, text } = req.body;
    Tweet.create({
      handle,
      text
    }, (err, createdTweet) => {
      if(err) return next(err);
      res.send(createdTweet);
    });
  })

  .get('/:id', (req, res) => { //TO ADD NEXT Middleware
    Tweet.findById(req.params.id, (err, foundTweet) => {
      // if(err){
      //   if(err.code === 'ENOENT')
      //     return next(new HttpError(400, `Bad Id: ${req.params.id}`));
      // } else {
      //   return next(err);
      // }
      res.send(foundTweet);
    });
  })

  .get('/', (req, res, next) => { 
    Tweet.find((err, tweetList) => {
      if(err) return next(err);
      res.send(tweetList);
    });
  })

  .put('/:id', (req, res) => {
    const { handle, text } = req.body;
    Tweet.findByIdAndUpdate(req.params.id, { handle, text }, (error, updatedTweet) => {
      
      res.send(updatedTweet);
    });
  })

  .delete('/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, (error, data) => {
      res.send(data);
    });

  });



  

