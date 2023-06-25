const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ID: { type: String},
  Title: { type: String, required: true },
  Author: { type: String, required: true },
  Gener: { type: String, required: true },
  PublishDate: { type: Date, required: true },
  Description: {
    type: String,
    maxlength: 10000, // Set maximum character limit for content
    required: true,
  },
});
module.exports = mongoose.model('Books', bookSchema);
