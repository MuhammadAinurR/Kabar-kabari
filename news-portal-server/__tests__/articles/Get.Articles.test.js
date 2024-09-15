const request = require('supertest');
const app = require('../../app');
const { seedData, cleanupData, adminToken } = require('../../helpers/testing');
const { addMoreArticles } = require('../../helpers/testingp2');


beforeAll(async () => {
    await seedData();
    await addMoreArticles();
});
afterAll(async () => await cleanupData());

describe.only('GET /articles', () => {
    describe('Success', () => {
        test('should return 200 status and get the articles', async () => {
            const { status, body } = await request(app).get('/articles')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(status).toBe(200);
            expect(body[0]).toHaveProperty('id', expect.any(Number));
            expect(body[0]).toHaveProperty('title', expect.any(String));
            expect(body[0].title).toBe('Finding Excalibur');
            expect(body[0]).toHaveProperty('imgUrl', expect.any(String));
            expect(body[0]).toHaveProperty('content', expect.any(String));
            expect(body[0].content).toBe("Sword, ward, and The Truth");
            expect(body[0]).toHaveProperty('authorId', expect.any(Number));
            expect(body[0]).toHaveProperty('categoryId', expect.any(Number));
        })
    })

    describe('Fail', () => {
        test('Not Login', async () => {
            const { status, body } = await request(app).get('/articles')

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
        test('Invalid Token', async () => {
            const { status, body } = await request(app).get('/articles')
                .set('Authorization', `Bearer InvalidToken`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
    })
})