const express = require('express');
const typeController = require('../controllers/typeController');

const router = express.Router();

router.get('/', typeController.getAllTypes);
router.get('/:id', typeController.getTypeById);
router.post('/', typeController.createType);
router.put('/:id', typeController.updateType);
router.delete('/:id', typeController.deleteType);
router.delete('/', typeController.deleteAllTypes);

module.exports = router;
