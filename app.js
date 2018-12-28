const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const { polisRoutes } = require('./src/polis');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER_NAME}:${
  process.env.MONGO_USER_PASSWORD
}@${process.env.MONGO_CLUSTER}/events?retryWrites=true`;

app.use('/api', polisRoutes);

app.use('/', (req, res, next) => {
  res.status(200).json({
    message: 'Hello world.'
  });
});

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);
const db = mongoose.connection;
db.on('error', () => console.log('Connection error.'));
db.on('open', () => {
  app.listen(process.env.PORT || 3000);
});
