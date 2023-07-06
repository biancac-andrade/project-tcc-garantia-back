const express = require('express');
const replacementController = require('../controllers/replacementController');

const router = express.Router();

router.get('/', replacementController.getAllReplacements);
router.get('/:id', replacementController.getReplacementById);
router.post('/', replacementController.createReplacement);
router.put('/:id', replacementController.updateReplacement);
router.delete('/:id', replacementController.deleteReplacement);

module.exports = router;
