//const { body,validationResult } = require("express-validator");
var UserInfo = require('../models/userinfo');
var Post = require('../models/post');

// Display login page form on GET.
exports.logout = function(req, res) {
    req.session.user = null;
    res.render("logout");
};

