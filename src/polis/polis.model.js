const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      dropDups: true
    },
    datetime: String,
    name: String,
    summary: String,
    url: String,
    type: String,
    location: {
      name: String,
      gps: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
