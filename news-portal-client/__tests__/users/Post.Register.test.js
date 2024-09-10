const request = require('supertest');
const app = require('../../app');
const { seedData, cleanupData, staffToken, adminToken } = require('../../helpers/testing');

beforeEach(async () => await seedData());
afterEach(async () => await cleanupData());

describe('POST /articles', () => {
    const newUserEmail = 'newMail@mail.com';
    const newUserPassword = 'nea1234';
    describe('Success', () => {
        test('should return 200 status and success create account as staff', async () => {

            const { status, body } = await request(app).post('/register')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "email": newUserEmail,
                    "password": newUserPassword
                });

            expect(status).toBe(201);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toHaveProperty('email', expect.any(String));
            expect(body.message.email).toBe(newUserEmail);
            expect(body.message).toHaveProperty('role', expect.any(String));
            expect(body.message.role).toBe('Staff');
        });
    });

    describe('Fail', () => {
        test('No email input', async () => {
            const { status, body } = await request(app).post('/register')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "password": newUserPassword
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Email should not null'])
        });

        test('No password input', async () => {
            const { status, body } = await request(app).post('/register')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "email": newUserEmail,
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Password should not null'])
        });

        test('Empty string email input', async () => {
            const { status, body } = await request(app).post('/register')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    'email': '',
                    "password": newUserPassword
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Email should not empty', 'Invalid email format'])
        });
        test('Password string email input', async () => {
            const { status, body } = await request(app).post('/register')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    'email': newUserEmail,
                    "password": ''
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Password should not empty', 'Password length should more than 5'])
        });

        test('Email already registered', async () => {
            await request(app).post('/register')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    'email': newUserEmail,
                    "password": newUserPassword
                });

            const { status, body } = await request(app).post('/register')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    'email': newUserEmail,
                    "password": newUserPassword
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Email has been registered'])
        });

        test('Invalid email format', async () => {
            const { status, body } = await request(app).post('/register')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    'email': 'babayagaaa',
                    "password": newUserPassword
                });

            expect(status).toBe(400);
            expect(body).toHaveProperty('message', expect.any(Object));
            expect(body.message).toStrictEqual(['Invalid email format'])
        });

        test('Not Admin User', async () => {

            const { status, body } = await request(app).post('/register')
                .set('Authorization', `Bearer ${staffToken}`)
                .send({
                    "email": newUserEmail,
                    "password": newUserPassword
                });

            expect(status).toBe(403);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Unauthorized Forbidden Error');
        });

        test('Invalid Token', async () => {

            const { status, body } = await request(app).post('/register')
                .set('Authorization', `Bearer InvalidToken`)
                .send({
                    "email": newUserEmail,
                    "password": newUserPassword
                });

            expect(status).toBe(401);
            expect(body).toHaveProperty('message', expect.any(String));
            expect(body.message).toBe('Error Authentication');
        });
    });
});
