// tests/account.controller.test.js

const request = require('supertest');
const express = require('express');
const ACCOUNT = require('../models/account.model');
const ACCOUNT_TYPE = require('../models/account_type.model');

// Import controllers
const {
  indexAcc,
  createAccount,
  updateAccount,
  deleteAccount,
  indexAccType,
  createAccType,
  updatedAccType,
  deleteAccType
} = require('../controllers/account.controller');

// Mock models
jest.mock('../models/account.model');
jest.mock('../models/account_type.model');

// Setup Express app for testing
const app = express();
app.use(express.json());

// Setup routes
app.get('/account', indexAcc);
app.post('/account', createAccount);
app.put('/account/:id', updateAccount);
app.delete('/account/:id', deleteAccount);
app.get('/account-type', indexAccType);
app.post('/account-type', createAccType);
app.put('/account-type/:id', updatedAccType);
app.delete('/account-type/:id', deleteAccType);

describe('ACCOUNT Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testing indexAcc
  describe('GET /account', () => {
    it('should return all accounts', async () => {
      const mockData = [{ id: 1, name: 'Savings Account' }];
      ACCOUNT.getAllAcc.mockResolvedValue(mockData);

      const response = await request(app).get('/account');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(ACCOUNT.getAllAcc).toHaveBeenCalledTimes(1);
    });

    it('should handle errors correctly', async () => {
      ACCOUNT.getAllAcc.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/account');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Database error');
      expect(ACCOUNT.getAllAcc).toHaveBeenCalledTimes(1);
    });
  });

  // Testing createAccount
  describe('POST /account', () => {
    it('should create a new account', async () => {
      const newAccount = { name: 'Checking Account' };
      const createdAccount = { id: 1, ...newAccount };

      ACCOUNT.createAccount.mockResolvedValue(createdAccount);

      const response = await request(app).post('/account').send(newAccount);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(createdAccount);
      expect(ACCOUNT.createAccount).toHaveBeenCalledWith(newAccount);
    });

    it('should handle creation errors correctly', async () => {
      ACCOUNT.createAccount.mockRejectedValue(new Error('Creation error'));

      const response = await request(app).post('/account').send({});

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Creation error');
      expect(ACCOUNT.createAccount).toHaveBeenCalledTimes(1);
    });
  });

  // Testing updateAccount
  describe('PUT /account/:id', () => {
    it('should update an existing account', async () => {
      const id = 1;
      const updateData = { name: 'Updated Account' };
      const updatedAccount = { id, ...updateData };

      ACCOUNT.updateAccount.mockResolvedValue(updatedAccount);

      const response = await request(app).put(`/account/${id}`).send(updateData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedAccount);
      expect(ACCOUNT.updateAccount).toHaveBeenCalledWith(id, updateData);
    });

    it('should handle update errors correctly', async () => {
      ACCOUNT.updateAccount.mockRejectedValue(new Error('Update error'));

      const response = await request(app).put('/account/1').send({});

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Update error');
      expect(ACCOUNT.updateAccount).toHaveBeenCalledTimes(1);
    });
  });

  // Testing deleteAccount
  describe('DELETE /account/:id', () => {
    it('should delete an existing account', async () => {
      const id = 1;
      const deletedResult = { message: 'Account deleted successfully' };

      ACCOUNT.deleteAccount.mockResolvedValue(deletedResult);

      const response = await request(app).delete(`/account/${id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(deletedResult);
      expect(ACCOUNT.deleteAccount).toHaveBeenCalledWith(id);
    });

    it('should handle deletion errors correctly', async () => {
      ACCOUNT.deleteAccount.mockRejectedValue(new Error('Deletion error'));

      const response = await request(app).delete('/account/1');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Deletion error');
      expect(ACCOUNT.deleteAccount).toHaveBeenCalledTimes(1);
    });
  });
});

describe('ACCOUNT_TYPE Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testing indexAccType
  describe('GET /account-type', () => {
    it('should return all account types', async () => {
      const mockData = [{ id: 1, type: 'Checking' }];
      ACCOUNT_TYPE.getAllAccType.mockResolvedValue(mockData);

      const response = await request(app).get('/account-type');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(ACCOUNT_TYPE.getAllAccType).toHaveBeenCalledTimes(1);
    });

    it('should handle errors correctly', async () => {
      ACCOUNT_TYPE.getAllAccType.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/account-type');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Database error');
      expect(ACCOUNT_TYPE.getAllAccType).toHaveBeenCalledTimes(1);
    });
  });

  // Testing createAccType
  describe('POST /account-type', () => {
    it('should create a new account type', async () => {
      const newAccType = { type: 'Savings' };
      const createdAccType = { id: 1, ...newAccType };

      ACCOUNT_TYPE.createAccType.mockResolvedValue(createdAccType);

      const response = await request(app).post('/account-type').send(newAccType);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(createdAccType);
      expect(ACCOUNT_TYPE.createAccType).toHaveBeenCalledWith(newAccType);
    });

    it('should handle creation errors correctly', async () => {
      ACCOUNT_TYPE.createAccType.mockRejectedValue(new Error('Creation error'));

      const response = await request(app).post('/account-type').send({});

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Creation error');
      expect(ACCOUNT_TYPE.createAccType).toHaveBeenCalledTimes(1);
    });
  });

  // Testing updatedAccType
  describe('PUT /account-type/:id', () => {
    it('should update an existing account type', async () => {
      const id = 1;
      const updateData = { type: 'Updated Type' };
      const updatedAccType = { id, ...updateData };

      ACCOUNT_TYPE.updateAccType.mockResolvedValue(updatedAccType);

      const response = await request(app).put(`/account-type/${id}`).send(updateData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedAccType);
      expect(ACCOUNT_TYPE.updateAccType).toHaveBeenCalledWith(id, updateData);
    });

    it('should handle update errors correctly', async () => {
      ACCOUNT_TYPE.updateAccType.mockRejectedValue(new Error('Update error'));

      const response = await request(app).put('/account-type/1').send({});

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Update error');
      expect(ACCOUNT_TYPE.updateAccType).toHaveBeenCalledTimes(1);
    });
  });

  // Testing deleteAccType
  describe('DELETE /account-type/:id', () => {
    it('should delete an existing account type', async () => {
      const id = 1;
      const deletedResult = { message: 'Account type deleted successfully' };

      ACCOUNT_TYPE.deleteAccType.mockResolvedValue(deletedResult);

      const response = await request(app).delete(`/account-type/${id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(deletedResult);
      expect(ACCOUNT_TYPE.deleteAccType).toHaveBeenCalledWith(id);
    });

    it('should handle deletion errors correctly', async () => {
      ACCOUNT_TYPE.deleteAccType.mockRejectedValue(new Error('Deletion error'));

      const response = await request(app).delete('/account-type/1');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Deletion error');
      expect(ACCOUNT_TYPE.deleteAccType).toHaveBeenCalledTimes(1);
    });
  });
});
