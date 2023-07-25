const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Registro de usuário
 exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'O usuário já existe' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role // Adicione o campo role no novo usuário
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro no registro do usuário:', error);
    res.status(500).json({ error: 'Erro no registro do usuário' });
  }
};

// Autenticação de usuário
 exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    console.log('Tipo de usuário:', user.role); // Adicione este console.log para verificar o tipo de usuário

    const token = generateAuthToken(user);

      // Gerar um token para o usuário autenticado
     // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  

    res.json({ token });
  } catch (error) {
    console.error('Erro na autenticação do usuário:', error);
    res.status(500).json({ error: 'Erro na autenticação do usuário' });
  }
}; 


// Função para verificar o token de autorização e retornar o role do usuário
exports.checkAuthentication = (req, res) => {
  try {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Token de autorização ausente' });
    }

    const token = authorizationHeader.replace('Bearer ', '');

    // Verificar se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Recuperar o ID do usuário e o role do objeto `decoded`
    const { userId, role } = decoded;

    // Aqui você pode fazer outras verificações com base no role do usuário, se necessário

    // Retornar os dados do perfil do usuário, incluindo o role
    res.json({ userId, role });
  } catch (error) {
    console.error('Erro de autenticação:', error);
    res.status(401).json({ error: 'Token de autorização inválido' });
  }
};


// Função auxiliar para gerar o token de autenticação
const generateAuthToken = (user) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role }, // Incluir o campo "role" no objeto de dados a serem assinados
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};
