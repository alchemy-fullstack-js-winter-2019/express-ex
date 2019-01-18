/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const { Router } = require('express');
const Tweet = require('../models/Tweet');

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

  .get('/', (err, res) => {

  });
