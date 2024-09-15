const ArticlesController = require('../controller/articlesController');
const CategoriesController = require('../controller/categoriesController');
const pubRoutes = require('express').Router();

pubRoutes.get('/articles', ArticlesController.getArticles);
pubRoutes.get('/articles/:id', ArticlesController.getArticleById);
pubRoutes.get('/categories', CategoriesController.getCategories);

module.exports = pubRoutes;