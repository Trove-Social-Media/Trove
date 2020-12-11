//const { body,validationResult } = require("express-validator");
var mongoose = require('mongoose');
var UserInfo = require('../models/userinfo');
var Post = require('../models/post');

// Display login page form on GET.
exports.userlist = async function(req, res) {
    console.log(req.body);
    UserInfo.find({},'')
    .populate('friends')
    .exec(function (err, list_users) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('userlist', { title: 'Trove User Profile Page', user_list: list_users});
    });
};

// Display login page create form on GET.
exports.userlist_create_get = function(req, res) {
    //res.render('index', { title: 'Trove Login Page'});
    res.send("User List Page");
};

// Handle userlist on POST
exports.userlist_create_post = async function(req, res) {   
    //Add user corresponding to button pressed to logged in user friends list
    UserInfo.updateOne(
    { username: req.body.action}, 
    { $push: { friends: req.session.user } },
    function(err, result) {
          if (err) {
            res.send(err);
          } else {
            //res.send("Success");
              console.log("Success 1");
          }
        }
    );
    
    console.log("The username were looking for is: " + req.body.action);
    var query;

    var user;
      await UserInfo.findOne({username: req.body.action}, function(err,pro){
          user=pro;
          console.log("We found " + user);
        });
    
         UserInfo.updateOne(
    { username: req.session.user.username}, 
    { $push: { friends: user }},
    function(err, result) {
          if (err) {
            res.send(err);
          } else {
            //res.send("Success");
              console.log("Adding" + user);
          }
        }
    );
     
    
    //TEST CODE
    //res.send(`You followed @${req.body.action}`);
    res.render('followeduser');
//    console.log(req.body.action);
    
 
    
};
