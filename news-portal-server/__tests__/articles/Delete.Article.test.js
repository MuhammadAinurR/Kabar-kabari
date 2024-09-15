const request = require('supertest');
const app = require('../../app');
const { seedData, cleanupData, staffToken, adminToken } = require('../../helpers/testing');

beforeEach(async () => await seedData());
afterEach(async () => await cleanupData());

describe('POST /articles', () => {
    describe('Success', () => {
        test('should return 200 status and access token', async () => {
            const { status, body } = await request(app).delete('/articles/1')
                .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIxNzU5ODAzfQ.15IIDq_ls014cO0KCUFerMlkPvu3OSaqZcbyvBCVF-A`)

            expect(status).toBe(200);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Finding Excalibur success to delete');
        });
    });

    describe('Fail', () => {
        const testCases = [
            {
                articleId: 1,
                description: 'Unauthenticated',
                token: '',
                expectedStatus: 401,
                expectedMessage: 'Error Authentication',
            },
            {
                articleId: 1,
                description: 'Invalid Token',
                token: 'Bearer invalid_token',
                expectedStatus: 401,
                expectedMessage: 'Error Authentication',
            },
            {
                articleId: 1000,
                description: 'Not Found',
                token: `Bearer ${adminToken}`,
                expectedStatus: 404,
                expectedMessage: 'Error not found',
            },
            {
                articleId: 1,
                description: 'Unauthorized article owner',
                token: `Bearer ${staffToken}`,
                expectedStatus: 403,
                expectedMessage: 'Unauthorized Forbidden Error',
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.description, async () => {
                const { status, body } = await request(app).delete(`/articles/${testCase.articleId}`)
                    .set('Authorization', testCase.token)

                expect(status).toBe(testCase.expectedStatus);
                expect(body).toHaveProperty('message');
                expect(body.message).toStrictEqual(testCase.expectedMessage);
            });
        });
    });
});
