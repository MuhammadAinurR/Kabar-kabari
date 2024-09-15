const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

module.exports = {
    hashPassword,
    comparePassword
}
