const { Router } = require('express');
const { 
  // getTags, 
  getTag,
  postTag,
  // delTag,
  // updateTag
} = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res) => {
    const tag = req.body;
    postTag(tag);
    res.send(getTag(tag._id));
  });
