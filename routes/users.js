var express = require('express');
var router = express.Router();

const UsersControllers = require('../controllers/users.controllers');

router.post('/register', UsersControllers.RegisterDetails);

module.exports = router;
