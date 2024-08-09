const request = require('supertest');
const express = require('express');
const TRANSACTIONS = require('../models/transaction.model');
const TRANSACTIONS_TYPE = require('../models/transaction_type.model');

// Import controllers
const {
    indexTransaction,
    createTransaction,
    updatedTransaction,
    deleteTransaction,
    indexTransType,
    createTransType,
    updatedTransType,
    deleteTranstype
} = require('../controllers/trasaction.controller');

// Mock models
jest.mock('../models/transaction.model');
jest.mock('../models/transaction_type.model');

// Setup Express app for testing
const app = express();
app.use(express.json());

// Setup routes
app.get('/transaction', indexTransaction);
app.post('/transaction', createTransaction);
app.put('/transaction/:id', updatedTransaction);
app.delete('/transaction/:id', deleteTransaction);
app.get('/transaction-type', indexTransType);
app.post('/transaction-type', createTransType);
app.put('/transaction-type/:id', updatedTransType);
app.delete('/transaction-type/:id', deleteTranstype);

describe('TRANSACTION Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /transaction', () => {
        it('should return all transactions', async () => {
            const mockData = [{ id: 1, amount: 100 }];
            TRANSACTIONS.getAllTrans.mockResolvedValue(mockData);

            const response = await request(app).get('/transaction');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockData);
            expect(TRANSACTIONS.getAllTrans).toHaveBeenCalledTimes(1);
        });

        it('should handle errors correctly', async () => {
            TRANSACTIONS.getAllTrans.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/transaction');

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Database error');
            expect(TRANSACTIONS.getAllTrans).toHaveBeenCalledTimes(1);
        });
    });

    describe('POST /transaction', () => {
        it('should create a new transaction', async () => {
            const newTransaction = { amount: 200 };
            const createdTransaction = { id: 1, ...newTransaction };

            TRANSACTIONS.createTrans.mockResolvedValue(createdTransaction);

            const response = await request(app).post('/transaction').send(newTransaction);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(createdTransaction);
            expect(TRANSACTIONS.createTrans).toHaveBeenCalledWith(newTransaction);
        });

        it('should handle creation errors correctly', async () => {
            TRANSACTIONS.createTrans.mockRejectedValue(new Error('Creation error'));

            const response = await request(app).post('/transaction').send({});

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Creation error');
            expect(TRANSACTIONS.createTrans).toHaveBeenCalledTimes(1);
        });
    });

    describe('PUT /transaction/:id', () => {
        it('should update an existing transaction', async () => {
            const id = 1;
            const updateData = { amount: 300 };
            const updatedTransaction = { id, ...updateData };

            TRANSACTIONS.updateTrans.mockResolvedValue(updatedTransaction);

            const response = await request(app).put(`/transaction/${id}`).send(updateData);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(updatedTransaction);
            expect(TRANSACTIONS.updateTrans).toHaveBeenCalledWith(id, updateData);
        });

        it('should handle update errors correctly', async () => {
            TRANSACTIONS.updateTrans.mockRejectedValue(new Error('Update error'));

            const response = await request(app).put('/transaction/1').send({});

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Update error');
            expect(TRANSACTIONS.updateTrans).toHaveBeenCalledTimes(1);
        });
    });

    describe('DELETE /transaction/:id', () => {
        it('should delete an existing transaction', async () => {
            const id = 1;
            const deleteResult = { message: 'Transaction deleted successfully' };

            TRANSACTIONS.deleteTrans.mockResolvedValue(deleteResult);

            const response = await request(app).delete(`/transaction/${id}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(deleteResult);
            expect(TRANSACTIONS.deleteTrans).toHaveBeenCalledWith(id);
        });

        it('should handle deletion errors correctly', async () => {
            TRANSACTIONS.deleteTrans.mockRejectedValue(new Error('Deletion error'));

            const response = await request(app).delete('/transaction/1');

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Deletion error');
            expect(TRANSACTIONS.deleteTrans).toHaveBeenCalledTimes(1);
        });
    });
});

describe('TRANSACTION_TYPE Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /transaction-type', () => {
        it('should return all transaction types', async () => {
            const mockData = [{ id: 1, type: 'Deposit' }];
            TRANSACTIONS_TYPE.getAllTransType.mockResolvedValue(mockData);

            const response = await request(app).get('/transaction-type');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockData);
            expect(TRANSACTIONS_TYPE.getAllTransType).toHaveBeenCalledTimes(1);
        }, 10000);

        it('should handle errors correctly', async () => {
            TRANSACTIONS_TYPE.getAllTransType.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/transaction-type');

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Database error');
            expect(TRANSACTIONS_TYPE.getAllTransType).toHaveBeenCalledTimes(1);
        });
    });

    describe('POST /transaction-type', () => {
        it('should create a new transaction type', async () => {
            const newTransType = { type: 'Withdrawal' };
            const createdTransType = { id: 1, ...newTransType };

            TRANSACTIONS_TYPE.createTransType.mockResolvedValue(createdTransType);

            const response = await request(app).post('/transaction-type').send(newTransType);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(createdTransType);
            expect(TRANSACTIONS_TYPE.createTransType).toHaveBeenCalledWith(newTransType);
        });

        it('should handle creation errors correctly', async () => {
            TRANSACTIONS_TYPE.createTransType.mockRejectedValue(new Error('Creation error'));

            const response = await request(app).post('/transaction-type').send({});

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Creation error');
            expect(TRANSACTIONS_TYPE.createTransType).toHaveBeenCalledTimes(1);
        });
    });

    describe('PUT /transaction-type/:id', () => {
        it('should update an existing transaction type', async () => {
            const id = 1;
            const updateData = { type: 'Transfer' };
            const updatedTransType = { id, ...updateData };

            TRANSACTIONS_TYPE.updateTransType.mockResolvedValue(updatedTransType);

            const response = await request(app).put(`/transaction-type/${id}`).send(updateData);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(updatedTransType);
            expect(TRANSACTIONS_TYPE.updateTransType).toHaveBeenCalledWith(id, updateData);
        });

        it('should handle update errors correctly', async () => {
            TRANSACTIONS_TYPE.updateTransType.mockRejectedValue(new Error('Update error'));

            const response = await request(app).put('/transaction-type/1').send({});

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Update error');
            expect(TRANSACTIONS_TYPE.updateTransType).toHaveBeenCalledTimes(1);
        });
    });

    describe('DELETE /transaction-type/:id', () => {
        it('should delete an existing transaction type', async () => {
            const id = 1;
            const deleteResult = { message: 'Transaction type deleted successfully' };

            TRANSACTIONS_TYPE.deleteTransType.mockResolvedValue(deleteResult);

            const response = await request(app).delete(`/transaction-type/${id}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(deleteResult);
            expect(TRANSACTIONS_TYPE.deleteTransType).toHaveBeenCalledWith(id);
        });

        it('should handle deletion errors correctly', async () => {
            TRANSACTIONS_TYPE.deleteTransType.mockRejectedValue(new Error('Deletion error'));

            const response = await request(app).delete('/transaction-type/1');

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Deletion error');
            expect(TRANSACTIONS_TYPE.deleteTransType).toHaveBeenCalledTimes(1);
        });
    });
});
