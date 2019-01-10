const express = require('express');

const router = express.Router();

const polisController = require('./polis.controller');

router.get('/events/fetch', polisController.fetchEvents);
router.get('/events/get-latest', polisController.getLatestEvents);
router.get('/events/categories', polisController.getCategories);
router.get('/events/locations', polisController.getLocations);

module.exports = router;
