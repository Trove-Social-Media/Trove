//const { body,validationResult } = require("express-validator");
const multer = require('multer');
const helpers = require('../helpers');
var UserInfo = require('../models/userinfo');
var Post = require('../models/post');
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
exports.create_post_get = function(req, res) {
    //res.render('profile', { title: 'Trove User Profile Page'});
    if(!req.session.user){
        res.send("User not found");
    }

    //This method is intended to show all posts of logged in users' friends
    Post.find({user: {"$in": req.session.user.friends}})
    .exec(function (err, list_posts) {
      if (err) { return next(err); }
      //Successful, so render
        console.log(list_posts);
      res.render('createPost', { title: 'Trove User Profile Page', user: req.session.user, post_list: list_posts});
    });
};

//POST function to create a post
exports.create_post = function(req, res) {
    //Store req post content
    var postcontent = req.body.postcontent;
    if(postcontent == null){
        res.send("Empty post");
    }
    else{
        //res.send(postcontent);
        //Create a new post object 
    var post = new Post(
      { content: req.body.postcontent,
        user:req.session.user,
        type: 'regular',
        //song: {path: trimmedPath}
      }
    );
      post.save(function (err) {
               if (err) { return next(err); }
               // state that the user has been sucessfully created
               
                //res.send("Success");
          res.render('postcreated');
             }); 

      console.log(post);
    }    
    
};

//POST function to create an audio post
exports.create_audio_post = function(req, res) {
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        var trimmedPath = req.file.path.slice(6);
        var filePath = req.file.path;
        audioPath = trimmedPath;
        console.log("The path is: " + trimmedPath);
        audioName = req.file.originalname;
        req.session.audioPath = audioPath;
        req.session.audioName = audioName;
        res.render('audioText', {name: req.session.audioName, path:req.session.audioPath});
    });   
};

//POST function to create the text for audio post
exports.create_audio_text = function(req, res) {
    //Store req post content
    var postcontent = req.body.postcontent;
    if(postcontent == null){
        res.send("Empty post");
    }
    else{
        //res.send(postcontent);
        //Create a new post object 
    var post = new Post(
      { content: req.body.postcontent,
        user:req.session.user,
        song: {path: req.session.audioPath},
        type: 'audio'
      }
    );
      post.save(function (err) {
               if (err) { return next(err); }
               // state that the user has been sucessfully created
               
                //res.send("Success");
                res.render('postcreated');
             }); 

      console.log(post);
    }    
    
};
