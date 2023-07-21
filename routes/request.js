const express = require('express');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getRequestById);
router.post('/', requestController.createRequest);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);
router.delete('/:requestId/:productId', requestController.deleteProductFromRequest);
router.delete('/', requestController.deleteAllRequests);


module.exports = router;
