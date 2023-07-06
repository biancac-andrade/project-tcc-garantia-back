const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  request_date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Request', requestSchema);
