const Router = require('express').Router;
const Tags = require('../../lib/models/Tags');

module.exports = Router()
  .post('/', (req, res) => {
    const { name } = req.body;
    Tags.create({
      name
    }, (err, createdTag) => {
      res.send(createdTag);
    });
  })
  // .get('/:id', (req, res) => {
  //   const _id = req.params.id;
  //   Tags.findById(_id, (err, tag) => {
  //     res.send(tag);
  //   });
  // })
  // .get('/', (req, res) => {
  //   Tags.find((err, tags) => {
  //     res.send(tags);
  //   });
  // })
  // .put('/:id', (req, res) => {
  //   const _id = req.params.id;
  //   const { name } = req.body;
  //   Tags.findByIdAndUpdate(_id, {
  //     name
  //   }, (err, updatedTag) => {
  //     res.send(updatedTag);
  //   });
  // })
  // .delete('/:id', (req, res) => {
  //   const _id = req.params.id;
  //   Tags.findByIdAndDelete(_id, (err, tag) => {
  //     res.send(tag);
  //   });
  // });

