const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => {
        done(null,user);
    })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL:'https://serene-river-54622.herokuapp.com/auth/google/callback'
    }, (accessToken,refreshToken,profile,done) => {   // error function
        User.findOne({googleId:profile.id}).then((existingUser) => {
            if (existingUser){
                // we already have a record
                done(null,existingUser);
            } else {
                new User({ googleId:profile.id }).save().then((user) => {
                    done(null,user);
                });
            }
        });
    })
);