const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');

console.log(config.DB_URI);
mongoose.connect(config.DB_URI, { useNewUrlParser: true })

const app = express();

// app.get('/rentals', function(req, res) {
//     res.json('success');
// })

app.use('/api/v1/rentals', require('./app/rentals'));

const PORT = process.env.PORT || 3001;
PORT
app.listen(3001, function() {
    console.log('server connected');
});