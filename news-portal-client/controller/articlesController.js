const { Op } = require('sequelize');
const { cloudinary } = require('../helpers/multer');
const { Article, User, Category } = require('../models');

class ArticlesController {
    static async createArticle(req, res, next) {
        try {
            const { title, content, imgUrl, categoryId } = req.body;
            const article = await Article.create({ title, content, imgUrl, categoryId, authorId: req.user.id });
            res.status(201).json(article);
        } catch (error) {
            next(error);
        }
    }

    static async getArticles(req, res, next) {
        const { filter, sort, search, page, userFilter } = req.query;
        let params = {
            include: [
                { model: User, attributes: { exclude: ['password'] } },
                { model: Category }
            ],
        }
        if (filter) params.include[1].where = { name: { [Op.iLike]: filter } };
        if (userFilter) params.include[0].where = { id: userFilter };
        if (sort === 'ASC') params.order = [['createdAt', 'ASC']]
        if (sort === 'DESC') params.order = [['createdAt', 'DESC']]
        if (search) params.where = { title: { [Op.iLike]: `%${search}%` } }

        const limit = 10;
        if (page) {
            params.offset = limit * (+page - 1);
            params.limit = limit;
        }

        try {
            const articles = await Article.findAndCountAll(params);
            res.status(200).json(articles);
        } catch (error) {
            next(error);
        }
    }

    static async getArticleById(req, res, next) {
        const { id } = req.params;
        try {
            const article = await Article.findByPk(id, {
                include: 'User'
            });
            if (!article) throw { name: 'NotFound' };
            res.status(200).json(article);
        } catch (error) {
            next(error);
        }
    }

    static async updateArticle(req, res, next) {
        const { id } = req.params;
        const { title, content, imgUrl, categoryId } = req.body;
        try {
            const article = await Article.findByPk(id);
            if (!article) throw { name: 'NotFound' };
            await article.update({ title, content, imgUrl, categoryId });
            res.status(200).json(article);
        } catch (error) {
            next(error);
        }
    }

    static async editImgUrl(req, res, next) {
        try {
            const article = await Article.findByPk(req.params.id)
            if (!article) throw { name: 'NotFound' };

            const file64 = req.file.buffer.toString('base64');
            const uploadResult = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${file64}`);
            await article.update({ imgUrl: uploadResult.url });

            res.status(200).json({ message: `Image ${article.title} success to update` });
        } catch (error) {
            next(error);
        }
    }

    static async deleteArticle(req, res, next) {
        const { id } = req.params;
        try {
            const article = await Article.findByPk(id);
            if (!article) throw { name: 'NotFound' };
            await article.destroy();
            res.status(200).json({ message: `${article.title} success to delete` })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ArticlesController;