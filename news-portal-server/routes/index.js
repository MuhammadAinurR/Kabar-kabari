const routes = require('express').Router();
const pubRoutes = require('./pubRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const articlesRoutes = require('./articlesRoutes');
const usersRoutes = require('./usersRoutes');
const errorsHandler = require('../helpers/errorsHandler');
const { authentication } = require('../middlewares/auth');

routes.use('/pub', pubRoutes);

routes.get('/', async (req, res) => res.json({title: 'News Portal Server'}));
  
routes.use('/', usersRoutes)
routes.use(authentication)
routes.use('/categories', categoriesRoutes);
routes.use('/articles', articlesRoutes);

routes.use(errorsHandler);

module.exports = routes;