const request = require('supertest');
const app = require('../../app');
const { seedData, cleanupData, staffToken } = require('../../helpers/testing');

beforeAll(async () => await seedData());
afterAll(async () => await cleanupData());

describe('POST /articles', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).post('/articles')
                .set('Authorization', `Bearer ${staffToken}`)
                .send({
                    'title': 'Finding Nemo',
                    'content': "It's about Nemo, Dory, And Me",
                    'imgUrl': 'this is image url',
                    'categoryId': 1
                });

            expect(status).toBe(201);
            expect(body).toHaveProperty('id', expect.any(Number));
            expect(body).toHaveProperty('title', expect.any(String));
            expect(body.title).toBe('Finding Nemo');
            expect(body).toHaveProperty('imgUrl', expect.any(String));
            expect(body).toHaveProperty('content', expect.any(String));
            expect(body.content).toBe("It's about Nemo, Dory, And Me");
            expect(body).toHaveProperty('authorId', expect.any(Number));
            expect(body).toHaveProperty('categoryId', expect.any(Number));
        });
    });

    describe('Fail', () => {
        const testCases = [
            {
                description: 'Unauthenticated',
                token: '',
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
                description: 'Invalid Token',
                token: 'Bearer invalid_token',
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
                description: 'Body Validation Error',
                token: `Bearer ${staffToken}`,
                request: {
                    'title': '',
                    'content': "It's about Nemo, Dory, And Me",
                    'imgUrl': 'this is image url',
                    'categoryId': 1
                },
                expectedStatus: 400,
                expectedMessage: ['Title should not empty'],
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.description, async () => {
                const { status, body } = await request(app).post('/articles')
                    .set('Authorization', testCase.token)
                    .send(testCase.request);

                expect(status).toBe(testCase.expectedStatus);
                expect(body).toHaveProperty('message');
                expect(body.message).toStrictEqual(testCase.expectedMessage);
            });
        });
    });
});
