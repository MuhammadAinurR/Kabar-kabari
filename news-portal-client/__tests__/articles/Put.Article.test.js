const request = require('supertest');
const app = require('../../app');
const { seedData, cleanupData, adminToken, staffToken } = require('../../helpers/testing');

beforeEach(async () => await seedData());
afterEach(async () => await cleanupData());

describe('POST /articles', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).put('/articles/1')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    'title': 'Nea nea',
                    'content': 'ini adalah cerita tentang nea'
                });

            expect(status).toBe(200);
            expect(body).toHaveProperty('id', expect.any(Number));
            expect(body).toHaveProperty('title', expect.any(String));
            expect(body.title).toBe('Nea nea');
            expect(body).toHaveProperty('imgUrl', expect.any(String));
            expect(body).toHaveProperty('content', expect.any(String));
            expect(body.content).toBe('ini adalah cerita tentang nea');
            expect(body).toHaveProperty('authorId', expect.any(Number));
            expect(body).toHaveProperty('categoryId', expect.any(Number));
        });
    });

    describe('Fail', () => {
        const testCases = [
            {
                articleId: 1,
                description: 'Unauthenticated',
                token: 'Bearer',
                request: {
                    'title': 'Finding Nemo',
                    'content': "It's about Nemo, Dory, And Me",
                    'imgUrl': 'this is image url',
                    'categoryId': 1
                },
                expectedStatus: 401,
                expectedMessage: 'Error Authentication',
            },
            {
                articleId: 1,
                description: 'Invalid Token',
                token: 'Bearer invalid_token',
                request: {
                    'title': 'saya',
                    'content': "It's about Nemo, Dory, And Me",
                    'imgUrl': 'this is image url',
                    'categoryId': 1
                },
                expectedStatus: 401,
                expectedMessage: 'Error Authentication',
            },
            {
                articleId: 1000,
                description: 'Not Found',
                token: `Bearer ${adminToken}`,
                request: {
                    'title': 'saya',
                    'content': "It's about Nemo, Dory, And Me"
                },
                expectedStatus: 404,
                expectedMessage: 'Error not found',
            },
            {
                articleId: 1,
                description: 'Unauthorized article owner',
                token: `Bearer ${staffToken}`,
                request: {
                    'title': 'saya',
                    'content': "It's about Nemo, Dory, And Me"
                },
                expectedStatus: 403,
                expectedMessage: 'Unauthorized Forbidden Error',
            },
            {
                articleId: 1,
                description: 'Body Validation Error ',
                token: `Bearer ${adminToken}`,
                request: {
                    'title': '',
                    'content': "It's about Nemo, Dory, And Me"
                },
                expectedStatus: 400,
                expectedMessage: ['Title should not empty'],
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.description, async () => {
                const { status, body } = await request(app).put(`/articles/${testCase.articleId}`)
                    .set('Authorization', testCase.token)
                    .send(testCase.request);

                expect(status).toBe(testCase.expectedStatus);
                expect(body).toHaveProperty('message');
                expect(body.message).toStrictEqual(testCase.expectedMessage);
            });
        });
    });
});
