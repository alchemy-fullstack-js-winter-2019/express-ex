const Router = require('express').Router;

module.exports = Router()
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  });
//   .post('/', (req, res) => {

//   })


