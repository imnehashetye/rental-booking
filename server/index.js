const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const auth = require('../server/auth/index');

mongoose.connect(config.DB_URI, { useNewUrlParser: true })

const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.use('/api/v1/rentals', auth.authMiddleware, require('./app/rentals'));
app.use('/v1/rentals', require('./app/rentals'));
app.use('/v1/user', require('./app/user'));

const PORT = process.env.PORT || 3001;
app.listen(3001, function() {
    console.log('server connected', PORT);
});