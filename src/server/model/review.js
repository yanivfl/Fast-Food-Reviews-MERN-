const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    user_author: {
    type: String, //user doc._id
    default: ''
  },
  restaurant_name: {
    type: String, //user doc._id
    default: ''
  },
  pictures: [{
    data: Buffer,
    contentType: String
  }],
  publish_date: {
    type: Date,
    default: Date.now()
  },
  topics: {
    bathroom_quality: { type: Number, min: 1, max: 5 },
    staff_kindness: { type: Number, min: 1, max: 5 },
    cleanliness: { type: Number, min: 1, max: 5 },
    drive_thru_quality: { type: Number, min: 0, max: 5, default: 0 }, //0 if doesn't exist
    delivery_speed: { type: Number, min: 0, max: 5, default: 0  }, //0 if doesn't exist
    food_quality: { type: Number, min: 1, max: 5 }
  },
  comment: {
    type: String, //user doc._id
    default: ''
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
