const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/another', (req, res) => {
  res.send('another');
});

app.listen(7891, () => {
  console.log('running');
});
