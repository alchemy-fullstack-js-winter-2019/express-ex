const express = require('express');
const app = express();
const Tweets = require('./routes/tweets');
const Tags = require('./routes/tags');
const notFound = require('./middleware/notFound');

app.use((req, res, next) => {
    req.startAt = Date.now();
    const responseTime = Date.now() - req.startAt;
    /* eslint-disable-next-line */
    console.log('incoming request',
        req.method, req.url, [res.statusCode], responseTime);
    next();
});



app.use(express.json());
app.use('/tweets', Tweets);
app.use('/tags', Tags);
app.use(notFound);



module.exports = app;
