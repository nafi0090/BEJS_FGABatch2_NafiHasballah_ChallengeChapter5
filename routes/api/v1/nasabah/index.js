var express = require('express');
var router = express.Router();

const NASABAH = require('../../../../controllers/nasabah.controller');

router.get('/', NASABAH.indexNasabah);

router.post('/create', NASABAH.createNasabah);

router.put('/update/:id', NASABAH.updatedNasabah);

router.delete('/delete/:id', NASABAH.deleteNasabah);

module.exports = router;