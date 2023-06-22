const express = require('express');
const router = express.Router();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');
const config = require('../config');

passport.use(new TwitterStrategy({
    consumerKey: config.twitterApiCredentials.consumerKey,
    consumerSecret: config.twitterApiCredentials.consumerSecret,
    callbackURL: "/auth/twitter/callback"
  },
  async function(token, tokenSecret, profile, done) {
    try {
      let user = await User.findOne({ twitterId: profile.id });

      if (!user) {
        user = new User({
          twitterId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          photo: profile.photos[0].value
        });

        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;