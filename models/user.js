const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); 


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['funcionario', 'admin'], default: 'funcionario' } 
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
