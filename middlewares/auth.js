const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Token de autorização ausente' });
    }

    const token = authorizationHeader.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error('Erro de autenticação:', error);
    res.status(401).json({ error: 'Token de autorização inválido' });
  }
};

module.exports = authMiddleware;
