var express = require('express');
var router = express.Router();

const MOTHER_NASABAH_CONTROLLER = require('../../../../controllers/nasabah.controller');

router.get('/', MOTHER_NASABAH_CONTROLLER.indexMotherNasabah);

router.post('/create', MOTHER_NASABAH_CONTROLLER.createMotherNasabah);

router.put('/update/:id', MOTHER_NASABAH_CONTROLLER.updatedMotherNasabah);

router.delete('/delete/:id', MOTHER_NASABAH_CONTROLLER.deleteMotherNasabah);

module.exports = router;