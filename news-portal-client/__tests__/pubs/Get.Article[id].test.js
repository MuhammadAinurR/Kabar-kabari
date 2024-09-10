const request = require('supertest');
const app = require('../../app');
const { seedData, cleanupData } = require('../../helpers/testing');

beforeAll(async () => { await seedData() });
afterAll(async () => await cleanupData());

describe('GET /pub/articles/:id', () => {
    describe('Success', () => {
        test('success get the article', async () => {
            const { status, body } = await request(app).get('/pub/articles/1')
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
        test('Article Not Found', async () => {
            const { status, body } = await request(app).get('/pub/articles/999');
            expect(status).toBe(404);
            expect(body).toHaveProperty('message');
            expect(body.message).toBe('Error not found');
        })
    })
})