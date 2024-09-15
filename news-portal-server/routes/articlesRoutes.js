const { upload } = require('../helpers/multer');
const articlesRoutes = require('express').Router();
const ArticlesController = require('../controller/articlesController');
const { articleAuthorization } = require('../middlewares/auth');

articlesRoutes.post('/', ArticlesController.createArticle);
articlesRoutes.get('/', ArticlesController.getArticles);
articlesRoutes.get('/:id', ArticlesController.getArticleById);
articlesRoutes.put('/:id', articleAuthorization, ArticlesController.updateArticle);
articlesRoutes.patch('/:id/img', articleAuthorization, upload.single("img"), ArticlesController.editImgUrl);
articlesRoutes.delete('/:id', articleAuthorization, ArticlesController.deleteArticle);

module.exports = articlesRoutes;

