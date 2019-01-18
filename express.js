const express = require('express');
const app = express();
const port = 7890;

app.get('/', (req, res) => {
  res.status(200).send('Hi');
});



app.listen(port, () => {
  console.log('Server listening on port 7890...');
});

