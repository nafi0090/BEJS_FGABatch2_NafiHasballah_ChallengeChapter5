const express = require('express');
const router = express.Router();
const NASABAH_ROUTER = require('./nasabah');
const MOTHER_NASABAH_ROUTER = require('./mother_nasabah');
const ADDRESS_TYPE_NASABAH_ROUTER = require('./address_type');
const ADDRESSES_NASABAH_ROUTER = require('./address');
const ACCOUNT_ROUTER = require('./account');
const ACCOUNT_TYPER_ROUTER = require('./account_type');
const TRANSACTION_ROUTER = require('./trasactions');
const TRANSACTION_TYPE_ROUTER = require('./transaction_type');
const AUTH_CONTROLLER = require('./auth');

router.use('/account', ACCOUNT_ROUTER);
router.use('/account_type', ACCOUNT_TYPER_ROUTER);
router.use('/transaction', TRANSACTION_ROUTER);
router.use('/transaction_type', TRANSACTION_TYPE_ROUTER);

// completed
router.use('/nasabah', NASABAH_ROUTER);
router.use('/mothernasabah', MOTHER_NASABAH_ROUTER);
router.use('/address', ADDRESSES_NASABAH_ROUTER);
router.use('/address_type', ADDRESS_TYPE_NASABAH_ROUTER);

router.use('/auth', AUTH_CONTROLLER);

module.exports = router;
