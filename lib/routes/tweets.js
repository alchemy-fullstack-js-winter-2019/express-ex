const { 
    Router,
} = require('express');
const Tweets = require('../models/tweets');


module.exports = Router()
//post a tweet
    .post('/', (req, res) => {
        const { tweet, handle } = req.body;
        Tweets.create({
            tweet, 
            handle
        }, 
        (err, createdTweet) => {
            res.send(createdTweet);
        });
    })

//get a list of tweets
    .get('/', (req, res) => {
        Tweets.find((err, listOfTweets) => {
            res.send(listOfTweets);
        });
    })
// can update a tweet by id 
    .put('/:id', (req, res) => {
        Tweets.findByIdAndUpdate(req.params.id, req.body, (err, updatedTweet) =>{
            res.send(updatedTweet);
        });
    })
//delete by id 
    .delete('/:id', (req, res) => {
        Tweets.findByIdAndDelete(req.params.id, (err, deletedStatus) => {
            res.send(deletedStatus);
        });
    })
//gets a tweet by id
    .get('/:id', (req, res) => {
        res.end(req.params.id);
    });

