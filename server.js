// var Promise = require('bluebird');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
// var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.use(express.static('public'));
app.use(session({ secret: 'kuyik' }));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // usually there'd be an async callback in here
  if (User.id !== undefined) {
    done(err)
  } else {
    done(null, User.id);
  }
});

var GOOGLE_CLIENT_ID = '852527836571-03k8l22dm1pbrh1d5okrkanmqp5t9ftr.apps.googleusercontent.com';

var GOOGLE_CLIENT_SECRET = 'sB4f5R_G5Ai1m9-cp-VZwu_F';

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    process.nextTick(function() {





        // usually there'd be an async callback in here
          if (User.id !== undefined) {
            done(err)
          } else {
            done(null, User.id);
          }    

          User.findOne({ googleId: profile.id }, function (err, user) {
           return done(err, user);
          });










    });

  }
));

app.get('/login', ()=>res.render(login.html));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['https://www.googleapis.com/auth/plus.login'] 
  })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/');
);







//////// sample user info (would be in database)

var User = [
  '1': {username: "fakeUser1"},
  '2': {username: "fakeUser2"}
];