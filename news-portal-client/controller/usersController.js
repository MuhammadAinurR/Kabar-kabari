const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models')
class UsersController {
    static async createStaff(req, res, next) {
        const { email, password, username, phoneNumber, address }  = req.body;
        try {
            const newUser = await User.create({ email, password, username, phoneNumber, address });
            delete newUser.dataValues.password;
            res.status(201).json({ message: newUser });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        try {
            if (!email) throw { name: "EmailIsRequired" };
            if (!password) throw { name: "PasswordIsRequired" };

            const user = await User.findOne({ where: { email: email } });
            if (!user) throw { name: "InvalidEmailOrPassword" };
            const isPasswordValid = comparePassword(password, user.password);

            if (!isPasswordValid) throw { name: "InvalidEmailOrPassword" };

            const access_token = signToken({ id: user.id });
            res.status(200).json({ access_token, email: user.email, role: user.role, username: user.username, userId: user.id });
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UsersController;