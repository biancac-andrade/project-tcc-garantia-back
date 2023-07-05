const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Token de autorização ausente' });
    }

    const token = authorizationHeader.replace('Bearer ', '');

    // Verificar se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adicionar o ID do usuário ao objeto `req` para uso posterior nas rotas
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error('Erro de autenticação:', error);
    res.status(401).json({ error: 'Token de autorização inválido' });
  }
};

module.exports = authMiddleware;
