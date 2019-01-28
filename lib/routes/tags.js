const { Router } = require('express');
const Tag = require('../models/Tag');
const { HttpError } = require('../middleware/error');


module.exports = Router()
  .post('/', (req, res) => {
    const { name, _id } = req.body;
    Tag.create({
      name,
      _id
    }, (err, createdTag) => {
      console.log('created tag', createdTag);
      res.send(createdTag);
    });
  }) 

  .get('/', (req, res) => {
    Tag.find((err, tags) => {
      res.send(tags);
    });
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Tag.findById(id, (err, tag) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, 'Bad Id'));
        } else {
          return next(err);
        }
      }
      res.send(tag);
    });
  })  

  .put('/:id', (req, res) => {
    const _id = req.params.id;
    const { name } = req.body;
    Tag.findByIdAndUpdate(_id, { 
      name 
    }, (err, updatedTag) => {
      res.send(updatedTag);
    });
  })

  .delete('/:id', (req, res) => {
    const _id = req.params.id;
    Tag.findByIdAndDelete(_id, (err, data) => {
      res.send(data);
    });
  });

 





  
