const express = require('express');
const app = express();

const dotenv = require('dotenv');
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");

dotenv.config({ path: './config.env' });

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
//connection to the static public files
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "YWyNGASERQjqcZpv34Rk",
    resave: true,
    saveUninitialized: false
}));

//Routes
const registerRoute = require('./routes/registerRoutes');
const loginRoute = require('./routes/loginRoutes');
const postRoute = require('./routes/postRoutes');
const logoutRoute = require('./routes/logout');

//API routes
const postsApiRoute = require('./routes/api/posts');

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/posts', postRoute);
app.use('/api/posts', postsApiRoute);
app.use('/logout', logoutRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {
    let payload = {
        pageTitle: 'Home',
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }
    res.status(200).render('home', payload);
});

module.exports = app;