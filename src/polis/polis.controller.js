const axios = require('axios');

const Event = require('./polis.model');

const tempaData = require('../../example-data');
const POLIS_API_URL = 'https://polisen.se/api/events';

exports.getEvents = async (req, res, nex) => {
  // const response = await axios.get(POLIS_API_URL);
  // const polisData = response.data;

  Event.create({
    id: 12324,
    name: 'test'
  });

  res.json({
    message: 'fetched!!',
    data: tempaData
  });
};
