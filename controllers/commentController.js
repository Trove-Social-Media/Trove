//const { body,validationResult } = require("express-validator");
const multer = require('multer');
const helpers = require('../helpers');
var UserInfo = require('../models/userinfo');
var Post = require('../models/post');
var Comment = require('../models/comment');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');




// Display home page form on GET.
exports.comment = function(req, res) {
    //res.render('profile', { title: 'Trove User Profile Page'});
    console.log("Current post is: " + req.session.currentPost);
    Post.findOne({_id: req.session.currentPost._id})
    .populate('user')
    .populate({
        path:'comments',
        model:'Comment',
        populate: {
            path:'user',
            model:'UserInfo'
        }
    })
    .exec(function (err, post) {
      if (err) { return next(err); }
      //Successful, so render
        //console.log('The comments are' + post.comments);
      res.render('comment', {post: post});
    });
    
};







// POST method to create a comment
exports.create_comment = function(req, res) {

    console.log(req.body.commenttext);
    var comment = new Comment({user: req.session.user, comment: req.body.commenttext});
    comment.save(function (err) {
               if (err) { return next(err); }
               // state that the user has been sucessfully created
             }); 
    console.log(comment)
    
        Post.findOneAndUpdate({ _id: req.session.currentPost._id }, { $push: { comments: comment }},function(err, response) {
         if (err) {
         callback(err);
        } else {
         res.send("Added a comment that says " + req.body.commenttext);
        }
        });
};