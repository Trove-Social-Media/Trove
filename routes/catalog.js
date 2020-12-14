var express = require('express');
var router = express.Router();

// Require controller modules.
var register_controller = require('../controllers/registerController');
var registerimage_controller = require('../controllers/registerimageController');
var login_controller = require('../controllers/loginController');
var profile_controller = require('../controllers/profileController');
var home_controller = require('../controllers/homeController');
var userlist_controller = require('../controllers/userlistController');
var createPost_controller = require('../controllers/createPostController');
var comment_controller = require('../controllers/commentController');
var logout_controller = require('../controllers/logOutController');

// GET catalog home page.
router.get('/', login_controller.index);

// GET log out page.
router.get('/logout', logout_controller.logout);

// GET register page.
router.get('/register', register_controller.register);

// GET request for register page.
router.get('/register', register_controller.register_create_get);

// POST request for register page.
router.post('/register', register_controller.register_create_post);


// GET request for create post page.
router.get('/home/create', createPost_controller.create_post_get);

// POST request for create post page.
router.post('/home/create', createPost_controller.create_post);

// POST request for create post page audio file.
router.post('/home/create/audio', createPost_controller.create_audio_post);

// POST request for create post page audio file text.
router.post('/home/create/audio/text', createPost_controller.create_audio_text);


// GET home page.
router.get('/home', home_controller.home);

// GET request for home page.
router.get('/home', home_controller.home_create_get);

//// POST request for home page create post.
//router.post('/home/create', home_controller.home_create_post);
//
//// POST request for home page create audio post.
//router.post('/home/create/audio', home_controller.home_create_audio_post);
//
//// POST request for home page create audio post text.
//router.post('/home/create/audio/text', home_controller.home_create_audio_text);

//POST request for home page like post.
router.post('/home/like', home_controller.home_create_like);

//POST request for home page create comment.
router.post('/home/comment', home_controller.home_create_comment);


// GET profile picture page.
router.get('/register/image', registerimage_controller.registerimage);

// GET request for profile picture page
router.get('/register/image', registerimage_controller.registerimage_create_get);

// POST request for profile picture page
router.post('/register/image', registerimage_controller.registerimage_create_post);

// GET userlist page.
router.get('/userlist', userlist_controller.userlist);

// GET request for userlist page
router.get('/userlist', userlist_controller.userlist_create_get);

// POST request for userlist page
router.post('/userlist', userlist_controller.userlist_create_post);


// GET login page.
router.get('/login', login_controller.login);

// GET request for login page
router.get('/', login_controller.login_create_get);

// POST request for login page
router.post('/', login_controller.login_create_post);

// GET User profile page.
router.get('/profile', profile_controller.profile);

// GET request for User Profile page
router.get('/profile/create', profile_controller.profile_create_get);

// POST request for User Profile page
router.post('/profile/create', profile_controller.profile_create_post);


// GET comment page.
router.get('/comment', comment_controller.comment);

// POST request for creating comment
router.post('/comment/create', comment_controller.create_comment);



module.exports = router;
