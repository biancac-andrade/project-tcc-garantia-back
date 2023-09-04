const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "O usuário já existe" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error("Erro no registro do usuário:", error);
    res.status(500).json({ error: "Erro no registro do usuário" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = generateAuthToken(user);

    res.json({ token });
  } catch (error) {
    console.error("Erro na autenticação do usuário:", error);
    res.status(500).json({ error: "Erro na autenticação do usuário" });
  }
};

exports.checkAuthentication = (req, res) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Token de autorização ausente" });
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { userId, role } = decoded;

    res.json({ userId, role });
  } catch (error) {
    console.error("Erro de autenticação:", error);
    res.status(401).json({ error: "Token de autorização inválido" });
  }
};

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};
