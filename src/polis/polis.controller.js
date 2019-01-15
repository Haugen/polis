const axios = require('axios');

const Event = require('./polis.model');

const POLIS_API_URL = 'https://polisen.se/api/events';

exports.fetchEvents = async (req, res, nex) => {
  try {
    const response = await axios.get(POLIS_API_URL);
    const polisData = response.data;

    const errors = [];
    const eventIds = [];

    for (let i = 0; i < polisData.length; i++) {
      try {
        await Event.create(polisData[i]);
        eventIds.push(polisData[i].id);
      } catch (error) {
        errors.push(error);
      }

      if (errors.length > 5) {
        break;
      }
    }

    res.status(200).json({
      message: 'Created events and potential errors.',
      eventIds: eventIds,
      errors: errors
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching new events.',
      errors: error
    });
  }
};

exports.getLatestEvents = async (req, res, next) => {
  try {
    let limit = Number(req.query.limit) || 10;

    const query = Event.find()
      .sort({ datetime: 'desc' })
      .limit(limit);

    if (req.query.location) {
      query.where({ 'location.name': req.query.location });
    }
    if (req.query.category) {
      query.where({ type: req.query.category });
    }

    const events = await query;

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: 'Error getting events.',
      errors: error
    });
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Event.distinct('type');
    categories.sort();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: 'Error getting categories.',
      errors: error
    });
  }
};

exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Event.distinct('location.name');
    locations.sort();

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({
      message: 'Error getting categories.',
      errors: error
    });
  }
};

/**
 * Used to update the datetime field on every record, moving it from String type
 * to Date type.
 */
exports.updateDate = async (req, res, next) => {
  try {
    const records = await Event.find();

    records.forEach(async record => {
      await Event.updateOne(
        { id: record.id },
        { $set: { datetime: record.datetime } }
      );
    });

    res.status(200).json({
      message: 'Records updated.'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating records.',
      errors: error
    });
  }
};
