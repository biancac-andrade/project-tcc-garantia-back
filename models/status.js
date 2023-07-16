const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  status_type: { type: String, required: true },
});

module.exports = mongoose.model('Status', statusSchema);
