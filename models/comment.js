var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'UserInfo'},
    comment: {type: String},
  }
);


//// Virtual for post's URL
//PostSchema
//.virtual('url')
//.get(function () {
//  return '/catalog/book/' + this._id;
//});

//Export model
module.exports = mongoose.model('Comment', CommentSchema);