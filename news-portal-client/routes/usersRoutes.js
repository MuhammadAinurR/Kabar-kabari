const UsersController = require('../controller/usersController');
const { authentication, registerAuthorization } = require('../middlewares/auth');
const usersRoutes = require('express').Router();

usersRoutes.post('/register', authentication, registerAuthorization, UsersController.createStaff);
usersRoutes.post('/login', UsersController.login);

module.exports = usersRoutes;

