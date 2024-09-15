const CategoriesController = require('../controller/categoriesController');
const categoriesRoutes = require('express').Router();

categoriesRoutes.post('/', CategoriesController.addCategory);
categoriesRoutes.get('/', CategoriesController.getCategories);
categoriesRoutes.put('/:id', CategoriesController.updateCategory);
categoriesRoutes.delete('/:id', CategoriesController.deleteCategory);

module.exports = categoriesRoutes;