const express = require('express');
const userController = require('../controllers/userController');
const createController = require('../controllers/createController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getUserProfile);
router.delete('/delete', authMiddleware, userController.deleteUser);
router.put('/update', authMiddleware, userController.updateUser);
router.post('/create', authMiddleware, createController.createUser); // Rota para criar um novo usuário


// Nova rota para listar todos os usuários (Somente para usuários com role: 'admin')
router.get('/all', authMiddleware, userController.getAllUsers);

// Nova rota para deletar outros usuários (Somente para usuários com role: 'admin')
router.delete('/delete/:id', authMiddleware, userController.deleteOtherUser);


module.exports = router;
