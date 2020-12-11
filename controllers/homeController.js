//const { body,validationResult } = require("express-validator");
const multer = require('multer');
const helpers = require('../helpers');
var UserInfo = require('../models/userinfo');
var Post = require('../models/post');
var Comment = require('../models/comment');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
var audioPath;
var audioName;

//define storage location for images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //cb(null, file.fieldname + '-' + Date.now());
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Display home page form on GET.
exports.home = function(req, res) {
    //res.render('profile', { title: 'Trove User Profile Page'});
    if(!req.session.user){
        res.send("User not found");
    }

    //This method is intended to show all posts of logged in users' friends
    Post.find({user: {"$in": req.session.user.friends}})
    .populate('user')
    .exec(function (err, list_posts) {
      if (err) { return next(err); }
      //Successful, so render
        console.log(list_posts);
      res.render('home', { title: 'Trove User Profile Page', user: req.session.user, post_list: list_posts});
        
    });
};

// Display login page create form on GET.
exports.home_create_get = function(req, res) {
    //res.render('index', { title: 'Trove Login Page'});
    res.send("User Profile GET");
};



// POST method to like a post
exports.home_create_like = async function(req, res) {
    //res.send(req.body.action);
        var post;
      await Post.findById(req.body.action, function(err,pro){
          post=pro;
          console.log("We found " + post);
        });
    
        Post.findOneAndUpdate({ _id: req.body.action }, { $inc: { likes: 1 } },function(err, response) {
         if (err) {
         callback(err);
        } else {
         //res.send("Added a like to post that says" + post.content);
            res.render('likepostmessage');
        }
        });
};

// POST method to create a comment
exports.home_create_comment = function(req, res) {
    //res.send(req.body.action);
        //var post;
      Post.findById(req.body.action, function(err,pro){
          //post=pro;
          req.session.currentPost = pro;
          res.redirect('/catalog/comment');
        });
    
    
    

};
