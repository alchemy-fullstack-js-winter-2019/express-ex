const { Router } = require('express').Router;



module.exports = Router()
  .get('/:id', (req,res) => {
    console.log(req.params);
    res.end(req.params.id);
  })
  .get('/', (req,res) => {
    res.end('root');
  });