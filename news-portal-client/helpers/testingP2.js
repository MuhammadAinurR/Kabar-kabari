const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const addMoreArticles = async () => {
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
        },
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
        },
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
        },
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
        },
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
        },
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
            categoryId: 2,
            authorId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
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
        },
        {
            title: "Finding Excalibur",
            content: "Sword, ward, and The Truth",
            imgUrl: "this is image url",
            categoryId: 2,
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
        },
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
        },
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
        },
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
            categoryId: 2,
            authorId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ])
}

module.exports = {
    addMoreArticles
}