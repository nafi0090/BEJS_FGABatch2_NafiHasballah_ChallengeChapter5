const express = require('express');
const router = express.Router();
const TRANSACTION_TYPE_CONTROLLER = require('../../../../controllers/trasaction.controller');

router.get('/', TRANSACTION_TYPE_CONTROLLER.indexTransType);

router.post('/create', TRANSACTION_TYPE_CONTROLLER.createTransType);

router.put('/update/:id', TRANSACTION_TYPE_CONTROLLER.updatedTransType);

router.delete('/delete/:id', TRANSACTION_TYPE_CONTROLLER.deleteTranstype);

module.exports = router;