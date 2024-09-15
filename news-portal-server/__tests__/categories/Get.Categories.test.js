const request = require('supertest');
const app = require('../../app');
const { seedData, cleanupData, adminToken } = require('../../helpers/testing');
const { addMoreArticles } = require('../../helpers/testingp2');


beforeAll(async () => {
    await seedData();
    await addMoreArticles();
});
afterAll(async () => await cleanupData());

describe.only('GET /categories', () => {
    describe('Success', () => {
        test('should return 200 status and get the categories', async () => {
            const { status, body } = await request(app).get('/categories')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(status).toBe(200);
            expect(body[0]).toHaveProperty('name', expect.any(String));
        })
    })

    describe('Fail', () => {
        test('Not Login', async () => {
            const { status, body } = await request(app).get('/categories')

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
        test('Invalid Token', async () => {
            const { status, body } = await request(app).get('/categories')
                .set('Authorization', `Bearer InvalidToken`);

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        })
    })
})