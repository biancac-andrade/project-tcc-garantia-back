const mongoose = require('mongoose');
const momentTz = require('moment-timezone');

const pendingSchema = new mongoose.Schema({
  pending_date: { type: Date, required: true },
  request: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }],
  status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status' }]
});

// Antes de salvar, ajuste o formato da data para o horário de Brasília
pendingSchema.pre('save', function (next) {
  if (this.pending_date) {
    const brasiliaTimezone = 'America/Sao_Paulo';
    const brasiliaDate = momentTz(this.pending_date).tz(brasiliaTimezone).subtract(3, 'hours');
    this.pending_date = brasiliaDate.format('DD/MM/YYYY HH:mm:ss');
  }
  next();
});

module.exports = mongoose.model('Pending', pendingSchema);
