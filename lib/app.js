const express = require('express');
const app = require('app');
const tweets = require('./routes/tweets');

app.use(express.json());
app.use('./tweets', tweets);

module.exports = app;