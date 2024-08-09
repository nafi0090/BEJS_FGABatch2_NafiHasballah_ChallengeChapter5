var express = require('express');
var router = express.Router();

const ADDRESS_TYPE_CONTROLLER = require('../../../../controllers/address.controller');

router.get('/', ADDRESS_TYPE_CONTROLLER.indexAddType);

router.post('/create', ADDRESS_TYPE_CONTROLLER.createAddType);

router.put('/update/:id', ADDRESS_TYPE_CONTROLLER.updatedAddType);

router.delete('/delete/:id', ADDRESS_TYPE_CONTROLLER.deleteAddType);

module.exports = router;