const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  status_type: { type: String, required: true },
  replace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Replacement' }
});

module.exports = mongoose.model('Status', statusSchema);
