var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/', function(req, res, next) {
  Comment.find({}, null, {sort: '-updated_at'}, function( err, comments, count) {
    res.json(comments);
  });
});

router.post('/', function(req, res,next) {
  new Comment({
    author: req.body.author,
    content: req.body.content,
    updated_at: Date.now()
  }).save( function(err, comment, count) {
    res.json(comment);
  });
});

router.put('/:id', function(req, res, next) {
  Comment.findByIdAndUpdate(
    req.params.id,
    { $set: { content: req.body.content }},
    function(err, comment) {
      res.json(comment);
    });
});

module.exports = router;
