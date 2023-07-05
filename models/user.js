const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['funcionario', 'admin'], default: 'funcionario' } // Adicione o campo de tipo de usuário (role)
});

module.exports = mongoose.model('User', userSchema);
