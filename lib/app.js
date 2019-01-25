const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('./middleware/notFound');
//NOTE: this is always last
const { handler } = require('./middleware/error');
//express.json parses the body.
app.use(express.json());


//MIDDLEWARE almost everything in express is middlewere, even our routes but they dont include the next method. 
//THIS is a logger we can use the morgan framework instead
// app.use((req, res, next) => {
//   res.on('finish', () => {
//     const responseTime = Date.now() = req.startTime;
//     console.log(`${req.method} ${req.url} ${res.statusCode} - ${responseTime}ms`);

//   });
//   next();
// });


//(path, tweets router)
app.use('/tweets', tweets);//middleware
app.use('/tags', tags);//middleware
app.use(notFound);
// app.use(handler);







// app.get('/:id', (req, res)=> {
//   res.send(req.params.id);
// });
module.exports = app;
