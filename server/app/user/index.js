const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.post('/auth', controller.auth);
router.post('/', controller.create);

module.exports = router;