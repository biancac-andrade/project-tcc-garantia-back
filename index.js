require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

// Configurar o servidor Express
const app = express();

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3001', // Configurar a origem permitida
}));

app.use(express.json());

// Configurar a conexão com o MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(3000, () => {
      console.log('Servidor iniciado na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

// Configurar as rotas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
