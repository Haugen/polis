const express = require('express');

const router = express.Router();

const polisController = require('./polis.controller');

router.get('/events/fetch', polisController.fetchEvents);
router.get('/events/get-latest', polisController.getLatestEvents);
router.get('/events/categories', polisController.getCategories);
router.get('/events/locations', polisController.getLocations);

// Route used to update date field on all records.
// router.get('/events/update-date', polisController.updateDate);

module.exports = router;
