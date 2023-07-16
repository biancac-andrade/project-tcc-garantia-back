const mongoose = require('mongoose');
const momentTz = require('moment-timezone');

const replacementSchema = new mongoose.Schema({
  replace_date: { type: Date, required: true },
  request: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }],
  status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status' }]
});

// Antes de salvar, ajuste o formato da data para o horário de Brasília
replacementSchema.pre('save', function (next) {
  if (this.replace_date) {
    const brasiliaTimezone = 'America/Sao_Paulo';
    const brasiliaDate = momentTz(this.replace_date).tz(brasiliaTimezone).subtract(3, 'hours');
    this.replace_date = brasiliaDate.format('DD/MM/YYYY HH:mm:ss');
  }
  next();
});

module.exports = mongoose.model('Replacement', replacementSchema);
