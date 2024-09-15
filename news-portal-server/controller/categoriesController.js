const { Category } = require('../models')
class CategoriesController {
    static async addCategory(req, res, next) {
        const { name } = req.body;
        try {
            const category = await Category.create({ name })
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    static async getCategories(req, res, next) {
        try {
            const categories = await Category.findAll({
                order: [['name', 'ASC']]
            });
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async updateCategory(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const category = await Category.findByPk(id);
            if (!category) throw { name: 'NotFound' };
            await category.update({ name });
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    static async deleteCategory(req, res, next) {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id);
            if (!category) throw { name: 'NotFound' };
            await category.destroy();
            res.status(200).json({ message: `${category.name} success to delete` })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoriesController;