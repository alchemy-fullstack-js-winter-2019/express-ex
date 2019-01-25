const { Router } = require('express');
const { 
  getTweets, 
  getTweet,
  postTweet,
  delTweet,
  updateTweet
} = require('../models/Tweets');

module.exports = Router()
  .post('/', (req, res) => {
    const tweet = req.body;
    if(!tweet) res.status(400).end();
    postTweet(tweet);
    res.status(200).send(getTweet(tweet._id));
  })

  .delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!getTweet(id)) res.status(400).send({ deleted: 0 });
    delTweet(req.body._id);
    res.status(200).send({ deleted: 1 });
  })

  .put('/:id', (req, res) => {
    const id = req.params.id;
    if(!getTweet(id)) res.status(400).send('id does not exist!');
    res.status(200).send(updateTweet(id, req.body));
  })

  .get('/', (req, res) => getTweets() ? res.status(200).send(getTweets()) : res.status(404).end())

  .get('/:id', (req, res) => getTweet(req.params.id) ? res.status(200).send(getTweet(req.params.id)) : res.status(400).send('id does not exist!'));
