//const { body,validationResult } = require("express-validator");
var UserInfo = require('../models/userinfo');
var Post = require('../models/post');


// Display home page form on GET.
exports.home = function(req, res) {
    //res.render('profile', { title: 'Trove User Profile Page'});
    if(!req.session.user){
        res.send("User not found");
    }

    //This was a testing find method showing all of the logged in users posts
//    Post.find({user: req.session.user}, 'content')
//    .exec(function (err, list_posts) {
//      if (err) { return next(err); }
//      //Successful, so render
//      res.render('home', { title: 'Trove User Profile Page', user: req.session.user, post_list: list_posts});
//    });
    
    //This method is intended to show all posts of logged in users' friends
    Post.find({user: {"$in": req.session.user.friends}})
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

//POST function to create a post
exports.home_create_post = function(req, res) {
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
        user:req.session.user
      }
    );
      post.save(function (err) {
               if (err) { return next(err); }
               // state that the user has been sucessfully created
               
                res.send("Success");
             }); 
//      UserInfo.updateOne(
//        { username: "someusername" },
//        { $addToSet: { posts: [post] } },
//        function(err, result) {
//          if (err) {
//            res.send(err);
//          } else {
//            res.send("Success");
//          }
//        }
//      ); 
      console.log(post);
    }    
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
         res.send("Added a like to post that says" + post.content);
        }
        });
};

// POST method to create a comment
exports.home_create_comment = async function(req, res) {
    //res.send(req.body.action);
        var post;
      await Post.findById(req.body.action, function(err,pro){
          post=pro;
          console.log("We found " + post);
        });
    
        var string = "Some comment"
    
        Post.findOneAndUpdate({ _id: req.body.action }, { $push: { comments: string } },function(err, response) {
         if (err) {
         callback(err);
        } else {
         res.send("Added a comment that says " + string);
        }
        });
};
