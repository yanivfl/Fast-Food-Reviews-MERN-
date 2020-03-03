const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
