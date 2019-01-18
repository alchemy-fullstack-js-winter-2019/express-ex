const Router = require('express').Router;
const Tweet = require('./models/Tweet');
//const Tag = require('/lib/models/Tag');

module.exports = Router()
  .post('/', (req, res) => {
    const { handle, text } = req.body;
    // new js syntax that means create both consts as one object
    Tweet.create({
      handle,
      text
    }, (err, createdTweet) => {
      res.Send(createdTweet);
    });
    res.end('');
  })
  .get('/', (req, res) => {
    res.end('root');  // just text to indicate it's the root folder
  })


  .get('/tweets', (req, res) => {
    console.log(req.tweets);
    res.end(req.params.tweets);
  })
  .get('/tweets/:id', (req, res) => {
    console.log(req.id);
    res.end(req.params.id);
  })
  .put('/tweets/:id', (req, res) => {
    console.log(req.id);
    res.end(req.params.id);
  })
  .delete('/tweets/:id', (req, res) => {
    console.log(req.id);
    res.removeHeader(req.params.id);
  });


