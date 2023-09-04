const mongoose = require('mongoose');
const momentTz = require('moment-timezone');

const requestSchema = new mongoose.Schema({
  request_date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status' }]

});

requestSchema.pre('save', function (next) {
  if (this.request_date) {
    const brasiliaTimezone = 'America/Sao_Paulo';
    const brasiliaDate = momentTz(this.request_date).tz(brasiliaTimezone).subtract(3, 'hours');
    this.request_date = brasiliaDate.format('DD/MM/YYYY HH:mm:ss');
  }
  next();
});

module.exports = mongoose.model('Request', requestSchema);
