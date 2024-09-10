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
            const { status, body } = await request(app).get('/articles/1')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(status).toBe(200);
            expect(body).toHaveProperty('id', expect.any(Number));
            expect(body).toHaveProperty('title', expect.any(String));
            expect(body.title).toBe('Finding Excalibur');
            expect(body).toHaveProperty('imgUrl', expect.any(String));
            expect(body).toHaveProperty('content', expect.any(String));
            expect(body.content).toBe("Sword, ward, and The Truth");
            expect(body).toHaveProperty('authorId', expect.any(Number));
            expect(body).toHaveProperty('categoryId', expect.any(Number));
        })
    })

    describe('Fail', () => {
        test('Not Login', async () => {
            const { status, body } = await request(app).get('/articles/1')

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
        test('Invalid Token', async () => {
            const { status, body } = await request(app).get('/articles/1')
                .set('Authorization', `Bearer InvalidToken`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
        test('Invalid Token', async () => {
            const { status, body } = await request(app).get('/articles/99999')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(status).toBe(404);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error not found');
        })
    })
})