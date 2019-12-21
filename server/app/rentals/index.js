const express = require('express');
const router = express.Router();
const controller = require('./rental.controller');

router.get('/', controller.rental);
router.get('/:id', controller.getrental);

module.exports = router;