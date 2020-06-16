const express = require('express');
const routes = express.Router();

const middleware = require('./middleware/auth');

const userController = require('./controllers/UserController');
const denounceController = require('./controllers/DenounceController');
const commentController = require('./controllers/CommentController');

routes.get('/user', middleware, userController.getUser);
routes.post('/user/login', userController.login);
routes.get('/user/logout', middleware, userController.logout);
routes.post('/user/register', userController.register);
routes.put('/user/password', middleware, userController.changePassword);

routes.get('/denounce/list', denounceController.list);
routes.get('/denounce/pages', denounceController.numPages);
routes.post('/denounce/register', denounceController.register);

routes.get('/comment/list/:idDenounce', commentController.list)
routes.post('/comment/register', commentController.register);

module.exports = routes;