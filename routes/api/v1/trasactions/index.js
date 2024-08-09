const express = require('express');
const router = express.Router();
const TRANSACTION_CONTROLLER = require('../../../../controllers/trasaction.controller');

router.get('/', TRANSACTION_CONTROLLER.indexTransaction);

router.post('/create', TRANSACTION_CONTROLLER.createTransaction);

router.put('/update/:id', TRANSACTION_CONTROLLER.updatedTransaction);

router.delete('/delete/:id', TRANSACTION_CONTROLLER.deleteTransaction);

module.exports = router;