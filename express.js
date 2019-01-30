/* eslint-disable no-console */
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/another', (req, res) => {
  res.end('another');
});

app.listen(7890, () => {
  console.log('running');
});

