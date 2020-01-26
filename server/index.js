const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const auth = require('../server/auth/index');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(function(connection) {
    console.log('hii');
    // Enabling mongoose debug mode if required
    mongoose.set('debug', true);
});

// DataBase 
// var mysql = require("mysql");
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "pwdpwd",
//     database: "rentalbookings"
// });
// con.connect(function(err) {
//     if (err) {
//         console.log('Error connecting to Db', err);
//         return;
//     }
//     console.log('Connection established');
// });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.use('/api/v1/rentals', auth.authMiddleware, require('./app/rentals'));
app.use('/v1/rentals', require('./app/rentals'));
app.use('/v1/user', require('./app/user'));
app.use('/v1/booking', auth.authMiddleware, require('./app/booking'));

const PORT = process.env.PORT || 3001;
app.listen(3001, function() {
    console.log('server connected', PORT);
});