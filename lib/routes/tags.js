const { Router } = require('express');
const { 
  getTags,
  getTag,
  postTag,
  delTag,
  updateTag
} = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res) => {
    const tag = req.body;
    postTag(tag);
    res.send(getTag(tag._id));
  })

  .delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!getTag(id)) res.send({ deleted: 0 });
    delTag(req.body._id);
    res.send({ deleted: 1 });
  })

  .put('/:id', (req, res) => {
    const id = req.params.id;
    if(!getTag(id)) res.send('id does not exist!');
    res.send(updateTag(id, req.body));
  })

  .get('/', (req, res) => res.send(getTags()));
