const mongoose = require('mongoose');
const momentTz = require('moment-timezone');
const mongoosePaginate = require('mongoose-paginate-v2'); 

const replacementSchema = new mongoose.Schema({
  replace_date: { type: Date, required: true },
  pending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pending' }],
  status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status' }]
});

replacementSchema.pre('save', function (next) {
  if (this.replace_date) {
    const brasiliaTimezone = 'America/Sao_Paulo';
    const brasiliaDate = momentTz(this.replace_date).tz(brasiliaTimezone).subtract(3, 'hours');
    this.replace_date = brasiliaDate.format('DD/MM/YYYY HH:mm:ss');
  }
  next();
});

replacementSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Replacement', replacementSchema);
