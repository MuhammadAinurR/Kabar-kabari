const request = require('supertest');
const app = require('../../app');
const { seedData, cleanupData, adminToken, staffToken } = require('../../helpers/testing');
const fs = require('fs')
const cwd = process.cwd()

beforeEach(async () => await seedData());
afterEach(async () => await cleanupData());

describe('Patch /articles/:id/img', () => {
    const imagePath = `${cwd}/__tests__/articles/images/test.jpg`;
    describe('Success', () => {
        test('should return 200 status and success message', async () => {
            const { status, body } = await request(app)
                .patch('/articles/1/img')
                .set('Authorization', `Bearer ${adminToken}`)
                .attach('img', fs.readFileSync(imagePath), 'test.jpg');

            expect(status).toBe(200);
            expect(body.message).toBe('Image Finding Excalibur success to update');
        });
    });

    describe('Fail', () => {
        test('Not Login', async () => {
            const { status, body } = await request(app)
                .patch('/articles/1/img')
                .attach('img', fs.readFileSync(imagePath), 'test.jpg');

            expect(status).toBe(401);
            expect(body.message).toBe('Error Authentication');
        });

        test('Not Valid Token', async () => {
            const { status, body } = await request(app)
                .patch('/articles/1/img')
                .set('Authorization', `Bearer InvalidToken`)
                .attach('img', fs.readFileSync(imagePath), 'test.jpg');

            expect(status).toBe(401);
            expect(body.message).toBe('Error Authentication');
        });

        test('Not Found', async () => {
            const { status, body } = await request(app)
                .patch('/articles/9999999/img')
                .set('Authorization', `Bearer ${adminToken}`)
                .attach('img', fs.readFileSync(imagePath), 'test.jpg');

            expect(status).toBe(404);
            expect(body.message).toBe('Error not found');
        });

        test('Not Authorized User', async () => {
            const { status, body } = await request(app)
                .patch('/articles/1/img')
                .set('Authorization', `Bearer ${staffToken}`)
                .attach('img', fs.readFileSync(imagePath), 'test.jpg');

            expect(status).toBe(403);
            expect(body.message).toBe('Unauthorized Forbidden Error');
        });

        test('Invalid request body', async () => {
            const { status, body } = await request(app)
                .patch('/articles/1/img')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(status).toBe(400);
            expect(body.message).toBe('Invalid input format');
        });

    });
});