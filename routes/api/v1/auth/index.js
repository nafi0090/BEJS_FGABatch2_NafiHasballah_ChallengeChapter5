var express = require('express');
var router = express.Router();

const AUTH_CONTROLLER = require('../../../../controllers/auth.controller');

router.post('/login', AUTH_CONTROLLER.login);

module.exports = router;