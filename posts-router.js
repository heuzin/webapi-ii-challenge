const express = require('express');

const Posts = require('./data/db');

const router = express.Router();

router.post('/', (req, res) => {
    const newPost = req.body;

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post." 
        })
    } else {
        Posts.insert(newPost)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "There was an error while saving the post to the database"
            });
        })
    }
})

module.exports = router;