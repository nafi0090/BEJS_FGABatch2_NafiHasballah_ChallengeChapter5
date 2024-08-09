const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { login } = require('../controllers/auth.controller');

// Mock bcrypt and jwt
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        nasabah: {
            findUnique: jest.fn(),
        },
    };
    return {
        PrismaClient: jest.fn(() => mPrismaClient),
    };
});

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.post('/login', login);

describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a token on successful login', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword' };
        const mockToken = 'mocked.token';

        prisma.nasabah.findUnique.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);  // Mock bcrypt.compare here
        jwt.sign.mockReturnValue(mockToken);

        const response = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token', mockToken);
        expect(prisma.nasabah.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
        expect(bcrypt.compare).toHaveBeenCalledWith('password', mockUser.password);
        expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id, email: mockUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should return 401 if email is not found', async () => {
        prisma.nasabah.findUnique.mockResolvedValue(null);

        const response = await request(app)
            .post('/login')
            .send({ email: 'notfound@example.com', password: 'password' });

        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid email or password' });
    });

    it('should return 401 if password is invalid', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword' };

        prisma.nasabah.findUnique.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false); // Mock bcrypt.compare here

        const response = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });

        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid email or password' });
    });

    it('should return 500 if an error occurs', async () => {
        prisma.nasabah.findUnique.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'An error occurred' });
    });
});
