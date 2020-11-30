var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'UserInfo'},
    likes: {type: Number},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    song: 
    { 
        path: String
    }, 
  }
);


//// Virtual for post's URL
//PostSchema
//.virtual('url')
//.get(function () {
//  return '/catalog/book/' + this._id;
//});

//Export model
module.exports = mongoose.model('Post', PostSchema);
