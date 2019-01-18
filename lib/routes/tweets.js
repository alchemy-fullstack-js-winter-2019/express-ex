const { 
    Router,
} = require('express');
const Tweets = require('../models/tweets');


module.exports = Router()
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


    .get('/:id', (req, res) => {
        res.end(req.params.id);
    });

