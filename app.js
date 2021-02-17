const express = require('express');
const app = express();
const port = 3000;
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://marik:marik8998@twitter.kw7or.mongodb.net/twitter?retryWrites=true&w=majority")
//     .then(() => {
//         console.log('DB Connection is Successfull!')
//     })
//     .catch((err) => {
//         console.log(`DB Connection error ${err}`)
//     })

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
//connection to the static public files
app.use(express.static(path.join(__dirname, "public")));

//Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {
    let payload = {
        pageTitle: 'Home'
    }
    res.status(200).render('home', payload);
});


const server = app.listen(port, () =>
    console.log('Server is listening on the port ' + port)
);