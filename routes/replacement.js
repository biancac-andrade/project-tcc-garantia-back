const express = require('express');
const replacementController = require('../controllers/replacementController');

const router = express.Router();

router.get('/', replacementController.getAllReplacements);
router.get('/:id', replacementController.getReplacementById);
router.post('/', replacementController.createReplacement);
router.put('/:id', replacementController.updateReplacement);
router.put('/status/:id', replacementController.updateReplacementStatus);
router.delete('/:id', replacementController.deleteReplacement);
router.delete('/', replacementController.deleteAllReplacements);

module.exports = router;
