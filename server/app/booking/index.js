const express = require('express');
const router = express.Router();
const controller = require('./booking.controller');

router.post('/', controller.create);

module.exports = router;