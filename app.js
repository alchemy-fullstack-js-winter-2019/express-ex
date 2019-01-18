
const express = require('express');
const app = express();


app.get('/:id', (req, res) => {
  res.end(req.params.id); 
});
module.exports = app;
