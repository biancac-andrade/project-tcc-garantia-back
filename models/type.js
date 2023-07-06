const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  name_type: { type: String, required: true },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Type', typeSchema);
