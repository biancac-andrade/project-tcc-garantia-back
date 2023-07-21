const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  name_type: { type: String, required: true },  
});

module.exports = mongoose.model('Type', typeSchema);
