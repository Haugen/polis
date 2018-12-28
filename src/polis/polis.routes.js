const express = require('express');

const router = express.Router();

const polisController = require('./polis.controller');

router.get('/events', polisController.getEvents);

module.exports = router;
