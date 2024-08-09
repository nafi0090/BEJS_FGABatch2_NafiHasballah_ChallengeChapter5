// tests/nasabah.controller.test.js

// Import semua yang diperlukan
const request = require('supertest');
const express = require('express');
const NASABAH = require('../models/nasabah.model');
const MOTHER_NASABAH = require('../models/mother_nasabah.model');

// Inisialisasi aplikasi Express untuk testing
const app = express();
app.use(express.json());

// Mock models
jest.mock('../models/nasabah.model');
jest.mock('../models/mother_nasabah.model');

// Import controllers
const {
  indexNasabah,
  createNasabah,
  updatedNasabah,
  deleteNasabah,
  indexMotherNasabah,
  createMotherNasabah,
  updatedMotherNasabah,
  deleteMotherNasabah,
} = require('../controllers/nasabah.controller');

// Setup routes for testing
app.get('/nasabah', indexNasabah);
app.post('/nasabah', createNasabah);
app.put('/nasabah/:id', updatedNasabah);
app.delete('/nasabah/:id', deleteNasabah);
app.get('/mother-nasabah', indexMotherNasabah);
app.post('/mother-nasabah', createMotherNasabah);
app.put('/mother-nasabah/:id', updatedMotherNasabah);
app.delete('/mother-nasabah/:id', deleteMotherNasabah);

// Testing untuk NASABAH
describe('NASABAH Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testing indexNasabah
  describe('GET /nasabah', () => {
    it('should return all nasabah', async () => {
      const mockData = [{ id: 1, name: 'John Doe' }];
      NASABAH.getAllNasabah.mockResolvedValue(mockData);

      const response = await request(app).get('/nasabah');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(NASABAH.getAllNasabah).toHaveBeenCalledTimes(1);
    });

    it('should handle errors correctly', async () => {
      NASABAH.getAllNasabah.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/nasabah');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Database error');
      expect(NASABAH.getAllNasabah).toHaveBeenCalledTimes(1);
    });
  });

  // Testing createNasabah
  describe('POST /nasabah', () => {
    it('should create a new nasabah', async () => {
      const newNasabah = { name: 'Jane Doe' };
      const createdNasabah = { id: 1, ...newNasabah };

      NASABAH.createNasabah.mockResolvedValue(createdNasabah);

      const response = await request(app).post('/nasabah').send(newNasabah);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(createdNasabah);
      expect(NASABAH.createNasabah).toHaveBeenCalledWith(newNasabah);
    });

    it('should handle creation errors correctly', async () => {
      NASABAH.createNasabah.mockRejectedValue(new Error('Creation error'));

      const response = await request(app).post('/nasabah').send({});

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Creation error');
      expect(NASABAH.createNasabah).toHaveBeenCalledTimes(1);
    });
  });

  // Testing updatedNasabah
  describe('PUT /nasabah/:id', () => {
    it('should update an existing nasabah', async () => {
      const id = 1;
      const updateData = { name: 'John Smith' };
      const updatedNasabah = { id, ...updateData };

      NASABAH.updateNasabah.mockResolvedValue(updatedNasabah);

      const response = await request(app).put(`/nasabah/${id}`).send(updateData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedNasabah);
      expect(NASABAH.updateNasabah).toHaveBeenCalledWith(id, updateData);
    });

    it('should handle update errors correctly', async () => {
      NASABAH.updateNasabah.mockRejectedValue(new Error('Update error'));

      const response = await request(app).put('/nasabah/1').send({});

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Update error');
      expect(NASABAH.updateNasabah).toHaveBeenCalledTimes(1);
    });
  });

  // Testing deleteNasabah
  describe('DELETE /nasabah/:id', () => {
    it('should delete an existing nasabah', async () => {
      const id = 1;
      const deletedResult = { message: 'Nasabah deleted successfully' };

      NASABAH.deleteNasabah.mockResolvedValue(deletedResult);

      const response = await request(app).delete(`/nasabah/${id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(deletedResult);
      expect(NASABAH.deleteNasabah).toHaveBeenCalledWith(id);
    });

    it('should handle deletion errors correctly', async () => {
      NASABAH.deleteNasabah.mockRejectedValue(new Error('Deletion error'));

      const response = await request(app).delete('/nasabah/1');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Deletion error');
      expect(NASABAH.deleteNasabah).toHaveBeenCalledTimes(1);
    });
  });
});

// Testing untuk MOTHER_NASABAH
describe('MOTHER_NASABAH Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testing indexMotherNasabah
  describe('GET /mother-nasabah', () => {
    it('should return all mother nasabah', async () => {
      const mockData = [{ id: 1, name: 'Jane Doe' }];
      MOTHER_NASABAH.getMotherNasabah.mockResolvedValue(mockData);

      const response = await request(app).get('/mother-nasabah');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(MOTHER_NASABAH.getMotherNasabah).toHaveBeenCalledTimes(1);
    });

    it('should handle errors correctly', async () => {
      MOTHER_NASABAH.getMotherNasabah.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/mother-nasabah');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Database error');
      expect(MOTHER_NASABAH.getMotherNasabah).toHaveBeenCalledTimes(1);
    });
  });

  // Testing createMotherNasabah
  describe('POST /mother-nasabah', () => {
    it('should create a new mother nasabah', async () => {
      const newMotherNasabah = { name: 'Jane Doe' };
      const createdMotherNasabah = { id: 1, ...newMotherNasabah };

      MOTHER_NASABAH.createMotherNasabah.mockResolvedValue(createdMotherNasabah);

      const response = await request(app).post('/mother-nasabah').send(newMotherNasabah);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(createdMotherNasabah);
      expect(MOTHER_NASABAH.createMotherNasabah).toHaveBeenCalledWith(newMotherNasabah);
    });

    it('should handle creation errors correctly', async () => {
      MOTHER_NASABAH.createMotherNasabah.mockRejectedValue(new Error('Creation error'));

      const response = await request(app).post('/mother-nasabah').send({});

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Creation error');
      expect(MOTHER_NASABAH.createMotherNasabah).toHaveBeenCalledTimes(1);
    });
  });

  // Testing updatedMotherNasabah
  describe('PUT /mother-nasabah/:id', () => {
    it('should update an existing mother nasabah', async () => {
      const id = 1;
      const updateData = { name: 'Jane Smith' };
      const updatedMotherNasabah = { id, ...updateData };

      MOTHER_NASABAH.updateMotherNasabah.mockResolvedValue(updatedMotherNasabah);

      const response = await request(app).put(`/mother-nasabah/${id}`).send(updateData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedMotherNasabah);
      expect(MOTHER_NASABAH.updateMotherNasabah).toHaveBeenCalledWith(id, updateData);
    });

    it('should handle update errors correctly', async () => {
      MOTHER_NASABAH.updateMotherNasabah.mockRejectedValue(new Error('Update error'));

      const response = await request(app).put('/mother-nasabah/1').send({});

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Update error');
      expect(MOTHER_NASABAH.updateMotherNasabah).toHaveBeenCalledTimes(1);
    });
  });

  // Testing deleteMotherNasabah
  describe('DELETE /mother-nasabah/:id', () => {
    it('should delete an existing mother nasabah', async () => {
      const id = 1;
      const deletedResult = { message: 'Mother Nasabah deleted successfully' };

      MOTHER_NASABAH.deleteMotherNasabah.mockResolvedValue(deletedResult);

      const response = await request(app).delete(`/mother-nasabah/${id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(deletedResult);
      expect(MOTHER_NASABAH.deleteMotherNasabah).toHaveBeenCalledWith(id);
    });

    it('should handle deletion errors correctly', async () => {
      MOTHER_NASABAH.deleteMotherNasabah.mockRejectedValue(new Error('Deletion error'));

      const response = await request(app).delete('/mother-nasabah/1');

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Deletion error');
      expect(MOTHER_NASABAH.deleteMotherNasabah).toHaveBeenCalledTimes(1);
    });
  });
});
