const { sequelize } = require('../models');
const { hashPassword } = require('./bcrypt');
const { queryInterface } = sequelize;


const adminAccount = {
    email: "admin@mail.com",
    password: "admin1234"
}
const staffAccount = {
    email: "staff@mail.com",
    password: "nea1234"
}
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIxODkyNDQyfQ.AR6f_EfwnkLZwi3ofMBMmYVT9J1kTq26hIE4RbPVuiE'
const staffToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzIxODkyNTA4fQ.Tb_MEV8MtaWuZIAq9TOaa1o5zdHegloZr3k_IR2QgZM'

const addUsers = async () => {
    await queryInterface.bulkInsert('Users', [
        {
            email: adminAccount.email,
            password: hashPassword(adminAccount.password),
            role: "Admin",
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            email: staffAccount.email,
            password: hashPassword(staffAccount.password),
            role: "Staff",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
}
const deleteUsers = async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })
}

const addCategories = async () => {
    await queryInterface.bulkInsert('Categories', [
        {
            name: "HotNews",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "Cartoon",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
}

const deleteCategories = async () => {
    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })
}

const addArticles = async () => {
    await queryInterface.bulkInsert('Articles', [
        {
            title: "Finding Excalibur",
            content: "Sword, ward, and The Truth",
            imgUrl: "this is image url",
            categoryId: 1,
            authorId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: "Finding Excalibur 2",
            content: "Sword, ward, and The Truth 2",
            imgUrl: "this is image url",
            categoryId: 1,
            authorId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
}

const seedData = async () => {
    await addUsers();
    await addCategories();
    await addArticles();
}

const cleanupData = async () => {
    await deleteUsers();
    await deleteCategories();
}

module.exports = {
    seedData,
    cleanupData,
    adminToken,
    staffToken,
    adminAccount,
    staffAccount
}