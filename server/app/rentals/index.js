const express = require('express');
const router = express.Router();
const controller = require('./rental.controller');

router.get('/', controller.rental);

module.exports = router;