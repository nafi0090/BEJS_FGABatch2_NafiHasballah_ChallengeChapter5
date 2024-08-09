const express = require('express');
const router = express.Router();
const ADDRESS_CONTROLLER = require('../../../../controllers/address.controller');

router.get('/', ADDRESS_CONTROLLER.indexAdd);

router.post('/create', ADDRESS_CONTROLLER.createAddress);

router.put('/update/:id', ADDRESS_CONTROLLER.updateAddress);

router.delete('/delete/:id', ADDRESS_CONTROLLER.deleteAdd);

module.exports = router;