// Create web server application
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./model/comment');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Parse JSON data
app.use(bodyParser.json());

// Handle GET request
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Handle GET request
app.get('/comments', (req, res) => {
    Comment.find().then((comments) => {
        res.json(comments);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Handle GET request
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id).then((comment) => {
        if (comment) {
            res.json(comment);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Handle POST request
app.post('/comments', (req, res) => {
    var comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save().then((comment) => {
        res.json(comment);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Handle PUT request
app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            comment: req.body.comment
        }
    }, {
        new: true
    }).then((comment) => {
        res.json(comment);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Handle DELETE request
app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id).then(() => {
        res.send('Comment removed successfully');
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

// Start web server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});