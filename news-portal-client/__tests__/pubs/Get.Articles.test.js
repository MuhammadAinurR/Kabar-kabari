const request = require('supertest');
const app = require('../../app');
const { seedData, cleanupData } = require('../../helpers/testing');
const { addMoreArticles } = require('../../helpers/testingp2');


beforeAll(async () => {
    await seedData();
    await addMoreArticles();
});
afterAll(async () => await cleanupData());

describe('GET /pub/articles', () => {
    describe('Success', () => {
        test('should return status 200 on normal state', async () => {
            const { status, body } = await request(app).get('/pub/articles')
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

        test('should return filtered data', async () => {
            const { status, body } = await request(app).get('/pub/articles?filter=cartoon')
            expect(status).toBe(200);
            expect(body[0].Category.name).toBe('Cartoon');
            expect(body[1].Category.name).toBe('Cartoon');

        })

        test('should return 10 data in 1 page', async () => {
            const { status, body } = await request(app).get('/pub/articles?page=1')
            expect(status).toBe(200);
            expect(body.length).toBeLessThanOrEqual(10)
        })
    })
})