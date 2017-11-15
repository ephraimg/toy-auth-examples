var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var UserSchema = mongoose.Schema({
  id: Number,
  googleId: String
});

var User = mongoose.model('User', userSchema);


module.exports.selectAll = selectAll;