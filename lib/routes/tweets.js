const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    console.log('Dis you get a', req.body);
    const { handle, text } = req.body;
    Tweet.create({
      handle,
      text
    }, (err, createdTweet) => {
     
      res.send(createdTweet);
      console.log('Whats up', createdTweet);
    });
  });

  // .get('./:id', (req, res) => {
  //   res.send({ name:req.params.name });
  // })
  // .get('/:id', (req, res) => {
  //   res.end('root'); 
  // });
