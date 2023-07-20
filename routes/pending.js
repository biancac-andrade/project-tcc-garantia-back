const express = require('express');
const pendingController = require('../controllers/pendingController');

const router = express.Router();

router.get('/', pendingController.getAllPendings);
router.get('/:id', pendingController.getPendingById);
router.post('/', pendingController.createPending);
router.put('/:id', pendingController.updatePending);
router.put('/status/:id', pendingController.updatePendingStatus);
router.delete('/:id', pendingController.deletePending);

module.exports = router;
