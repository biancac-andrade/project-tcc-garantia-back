const mongoose = require('mongoose');
const momentTz = require('moment-timezone');
const mongoosePaginate = require('mongoose-paginate-v2');

const pendingSchema = new mongoose.Schema({
  pending_date: { type: Date, required: true },
  request: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }],
  status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status' }]
});

pendingSchema.pre('save', function (next) {
  if (this.pending_date) {
    const brasiliaTimezone = 'America/Sao_Paulo';
    const brasiliaDate = momentTz(this.pending_date).tz(brasiliaTimezone).subtract(3, 'hours');
    this.pending_date = brasiliaDate.format('DD/MM/YYYY HH:mm:ss');
  }
  next();
});

pendingSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Pending', pendingSchema);
