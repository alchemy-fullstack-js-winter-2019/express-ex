// POST - create
// GET id - findById
// GET tweets - find
// PUT - findByIdAndUpdate
// DELETE - findByIdAndDelete

const { Router } = require('express');
const Tweets = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    const { handle, text } = req.body; // what exactly does this  mean?
    Tweets.create({
      handle,
      text
    }, (err, createdTweet) => { // what exactly is a callback?
      res.send(createdTweet); // what is the response/what does it contain? What does .send do?
    });
  })

  .get('/', (req, res) => {
    console.log(req.body);
    Tweets.find((err, listOfTweets) => {
      res.send(listOfTweets);
    });
  })

  .get('/:id', (req, res) => {
    // req.params.id
    // res.end('')
    // res.write('')
    // res.send({ name: 'ryan' <-- json })
  })

  .put('/:id', (req, res) => {
    // req.body
    // req.params.id
    // Tweet.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {

    // });
  })

  .delete('/:id', (req, res) => {

  });