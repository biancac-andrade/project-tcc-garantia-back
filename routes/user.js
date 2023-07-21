const express = require('express');
const userController = require('../controllers/userController');
const createController = require('../controllers/createController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getUserProfile);
router.delete('/delete', authMiddleware, userController.deleteUser);
router.put('/update', authMiddleware, userController.updateUser);
router.post('/create', authMiddleware, createController.createUser);
router.get('/all', authMiddleware, userController.getAllUsers);
router.delete('/delete/:id', authMiddleware, userController.deleteOtherUser);


module.exports = router;
