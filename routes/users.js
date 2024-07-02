var express = require('express');
var router = express.Router();

const UsersControllers = require('../controllers/users.controllers');
const validationMiddleware = require('../service/validate');
const { CreateUserDto } = require('../dto/users');

router.post('/register', validationMiddleware(CreateUserDto), UsersControllers.RegisterDetails);

module.exports = router;
