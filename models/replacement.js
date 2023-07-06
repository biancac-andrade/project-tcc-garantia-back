const mongoose = require('mongoose');

const replacementSchema = new mongoose.Schema({
  replace_date: { type: Date, required: true },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Replacement', replacementSchema);
