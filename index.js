const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();   // can have different apps

app.use(
    cookieSession({
        maxAge: 30 * 86400 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


require('./router/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);