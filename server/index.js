const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/dev');
const Rental = require('./models/rental');

mongoose.connect(config.DB_URI, { useNewUrlParser: true })

const app = express();
app.use(cors());

app.use('/api/v1/rentals', require('./app/rentals'));

const PORT = process.env.PORT || 3001;
app.listen(3001, function() {
    console.log('server connected', PORT);
});