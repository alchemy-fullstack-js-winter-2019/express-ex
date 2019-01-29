const express = require('express');
const app = express();

app.get('/:name', (req, res) => {
  res.end(req.params.name);
});

module.exports = app;
