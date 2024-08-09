const express = require('express');
const router = express.Router();
const ACCOUNT_CONTROLLER = require('../../../../controllers/account.controller');

router.get('/', ACCOUNT_CONTROLLER.indexAcc);

router.post('/create', ACCOUNT_CONTROLLER.createAccount);

router.put('/update/:id', ACCOUNT_CONTROLLER.updateAccount);

router.delete('/delete/:id', ACCOUNT_CONTROLLER.deleteAccount);

module.exports = router;