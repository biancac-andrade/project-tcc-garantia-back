const mongoose = require('mongoose');
const momentTz = require('moment-timezone');

const replacementSchema = new mongoose.Schema({
  replace_date: { type: Date, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  status: { type: String, required: true }
});

// Antes de salvar, ajuste o formato da data para o horário de Brasília
requestSchema.pre('save', function (next) {
  if (this.replace_date) {
    const brasiliaTimezone = 'America/Sao_Paulo';
    const brasiliaDate = momentTz(this.request_date).tz(brasiliaTimezone).subtract(3, 'hours');
    this.replace_date = brasiliaDate.format('DD/MM/YYYY HH:mm:ss');
  }
  next();
});

module.exports = mongoose.model('Replacement', replacementSchema);
