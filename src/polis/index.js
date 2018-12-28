const schedule = require('node-schedule');
const axios = require('axios');

const polisRoutes = require('./polis.routes');

/**
 * Schedule houerly fetch of new events from remote API.
 */
const scheduleFetch = () =>
  schedule.scheduleJob('0 */1 * * *', async function(req, res, next) {
    console.log('Starting hourly fetching process.', new Date());
    const response = await axios.get(req.headers.host + '/api/events/fetch');
    const data = response.data;

    console.log(data);
  });

module.exports = {
  polisRoutes,
  scheduleFetch
};
