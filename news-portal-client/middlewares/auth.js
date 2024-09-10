const { verifyToken } = require('../helpers/jwt');
const { User, Article } = require('../models')
async function authentication(req, res, next) {
    try {
        const access_token = req.headers.authorization;
        if (!access_token) throw { name: "Unauthenticated" };

        const [bearer, token] = access_token.split(" ");
        if (bearer !== 'Bearer') throw { name: "Unauthenticated" };

        const payload = verifyToken(token)
        const user = await User.findByPk(payload.id)
        if (!user) throw { name: "Unauthenticated" };
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        next();
    } catch (error) {
        next(error)
    }
}

async function articleAuthorization(req, res, next) {
    const articleId = req.params.id;
    const userId = req.user.id;
    const { role } = req.user;
    try {
        if (role === 'Staff') {
            const article = await Article.findByPk(articleId)
            if (!article) throw { name: "NotFound" }
            if (article.authorId !== userId) throw { name: "Unauthorized" }
        } else if (role !== 'Admin') throw { name: 'Unauthorized' }
        next()
    } catch (error) {
        next(error);
    }
}

async function registerAuthorization(req, res, next) {
    try {
        const userRole = req.user.role
        if (userRole !== 'Admin') throw { name: "Unauthorized" }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    authentication,
    registerAuthorization,
    articleAuthorization
}