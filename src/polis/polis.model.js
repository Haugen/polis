const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  id: Number,
  datetime: String,
  name: String,
  summary: String,
  url: String,
  type: String,
  location: {
    name: String,
    gps: String
  }
});

module.exports = mongoose.model('Event', eventSchema);
