const { 
    Router,
} = require('express');
const Tags = require('../models/Tags');

module.exports = Router()

    .post('/', (req, res) => {
        const { tag, group } = req.body;
        Tags.create({
            tag,
            group
        }, (err, createdTag) => {
            res.send(createdTag);
        }); 
    })

    .get('/', (req, res) => {
        Tags.find((err, listOfTags) => {
            res.send(listOfTags);
        });
    })
    .put('/:id', (req, res) => {
        Tags.findByIdAndUpdate(req.params.id, req.body, (err, updatedTag) => {
            res.send(updatedTag);
        });
    })
    .delete('/:id', (req, res) => {
        Tags.findByIdAndDelete(req.params.id, (err, deletedStatus) => {
            res.send(deletedStatus);
        });
    })
    .get('/:id', (req, res) => {
        res.end(req.params.id);
    });
