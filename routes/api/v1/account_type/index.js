const express = require('express');
const router = express.Router();
const ACCOUNT_TYPE_CONTROLLER = require('../../../../controllers/account.controller');

router.get('/', ACCOUNT_TYPE_CONTROLLER.indexAccType);

router.post('/create', ACCOUNT_TYPE_CONTROLLER.createAccType);

router.put('/update/:id', ACCOUNT_TYPE_CONTROLLER.updatedAccType);

router.delete('/delete/:id', ACCOUNT_TYPE_CONTROLLER.deleteAccType);

module.exports = router;