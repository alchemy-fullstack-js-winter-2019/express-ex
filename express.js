const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.end('Hello There!');
});

app.listen(7890, () => {
  console.log('Listening on PORT 7890');
});
