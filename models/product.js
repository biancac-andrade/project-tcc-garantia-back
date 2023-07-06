const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  quantity: { type: Number, default: 0 },
  type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }]
});

module.exports = mongoose.model('Product', productSchema);
