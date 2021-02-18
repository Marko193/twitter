const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

//The require(‘mongoose’) call above returns a Singleton object. 
//It means that the first time you call require(‘mongoose’), it 
//is creating an instance of the Mongoose class and returning it. 
//On subsequent calls, it will return the same instance that was 
//created and returned to you the first time because of how module 
//import/export works in ES6.

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

//UNCAUGHT EXCEPTIONS
// process.on('uncaughtException', (err) => {
//     console.log('UNCAUGHT EXCEPTION! Shutting down...');
//     console.log(err.name, ':', err.message);
//     process.exit(1);
// });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

//We should define in a config file _LOCAL and _GLOBAL var for connection
//    .connect(process.env.DATABASE_LOCAL, {  //connection to the local DB

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        //console.log(con.connections);
        console.log('DB is successfully connected!');
    })

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App's running on port ${port}...`);
});

// //UNHANDLED REJECTIONS
// process.on('unhandledRejection', (err) => {
//     console.log('UNHANDLED REJECTION! Shutting down...');
//     console.log(err.name, ':', err.message);
//     server.close(() => {
//         process.exit(1);
//     });
// });