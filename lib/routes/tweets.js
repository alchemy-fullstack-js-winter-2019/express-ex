const { Router } = require('express');

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
  .get('/', (req, res) => {
      
  });
