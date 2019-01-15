const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  id: {
    type: String,
    unique: true,
    dropDups: true
  },
  datetime: Date,
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
