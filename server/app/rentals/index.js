const express = require('express');
const router = express.Router();
const controller = require('./rental.controller');
const auth = require('../../auth/index');

router.get('/', controller.rental);
router.get('/:id', auth.authMiddleware, controller.getrental);

module.exports = router;