const request = require('supertest');
const express = require('express');
const ADDRESS = require('../models/address.model');
const ADDRESS_TYPE = require('../models/address_type.model');

// Import controllers
const {
    indexAdd,
    createAddress,
    updateAddress,
    deleteAdd,
    indexAddType,
    createAddType,
    updatedAddType,
    deleteAddType
} = require('../controllers/address.controller');

// Mock models
jest.mock('../models/address.model');
jest.mock('../models/address_type.model');

// Setup Express app for testing
const app = express();
app.use(express.json());

// Setup routes
app.get('/address', indexAdd);
app.post('/address', createAddress);
app.put('/address/:id', updateAddress);
app.delete('/address/:id', deleteAdd);
app.get('/address-type', indexAddType);
app.post('/address-type', createAddType);
app.put('/address-type/:id', updatedAddType);
app.delete('/address-type/:id', deleteAddType);

describe('ADDRESS Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /address', () => {
        it('should return all addresses', async () => {
            const mockData = [{ id: 1, street: '123 Main St' }];
            ADDRESS.getAllAddress.mockResolvedValue(mockData);

            const response = await request(app).get('/address');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockData);
            expect(ADDRESS.getAllAddress).toHaveBeenCalledTimes(1);
        });

        it('should handle errors correctly', async () => {
            ADDRESS.getAllAddress.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/address');

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Database error');
            expect(ADDRESS.getAllAddress).toHaveBeenCalledTimes(1);
        });
    });

    describe('POST /address', () => {
        it('should create a new address', async () => {
            const newAddress = { street: '456 Elm St' };
            const createdAddress = { id: 1, ...newAddress };

            ADDRESS.createAdd.mockResolvedValue(createdAddress);

            const response = await request(app).post('/address').send(newAddress);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(createdAddress);
            expect(ADDRESS.createAdd).toHaveBeenCalledWith(newAddress);
        });

        it('should handle creation errors correctly', async () => {
            ADDRESS.createAdd.mockRejectedValue(new Error('Creation error'));

            const response = await request(app).post('/address').send({});

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Creation error');
            expect(ADDRESS.createAdd).toHaveBeenCalledTimes(1);
        });
    });

    describe('PUT /address/:id', () => {
        it('should update an existing address', async () => {
            const id = 1;
            const updateData = { street: '789 Maple St' };
            const updatedAddress = { id, ...updateData };

            ADDRESS.updateAdd.mockResolvedValue(updatedAddress);

            const response = await request(app).put(`/address/${id}`).send(updateData);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(updatedAddress);
            expect(ADDRESS.updateAdd).toHaveBeenCalledWith(id, updateData);
        });

        it('should handle update errors correctly', async () => {
            ADDRESS.updateAdd.mockRejectedValue(new Error('Update error'));

            const response = await request(app).put('/address/1').send({});

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Update error');
            expect(ADDRESS.updateAdd).toHaveBeenCalledTimes(1);
        });
    });

    describe('DELETE /address/:id', () => {
        it('should delete an existing address', async () => {
            const id = 1;
            const deleteResult = { message: 'Address deleted successfully' };

            ADDRESS.deleteAdd.mockResolvedValue(deleteResult);

            const response = await request(app).delete(`/address/${id}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(deleteResult);
            expect(ADDRESS.deleteAdd).toHaveBeenCalledWith(id);
        });

        it('should handle deletion errors correctly', async () => {
            ADDRESS.deleteAdd.mockRejectedValue(new Error('Deletion error'));

            const response = await request(app).delete('/address/1');

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Deletion error');
            expect(ADDRESS.deleteAdd).toHaveBeenCalledTimes(1);
        });
    });
});

describe('ADDRESS_TYPE Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /address-type', () => {
        it('should return all address types', async () => {
            const mockData = [{ id: 1, type: 'Home' }];
            ADDRESS_TYPE.getAddressType.mockResolvedValue(mockData);

            const response = await request(app).get('/address-type');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockData);
            expect(ADDRESS_TYPE.getAddressType).toHaveBeenCalledTimes(1);
        });

        it('should handle errors correctly', async () => {
            ADDRESS_TYPE.getAddressType.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/address-type');

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Database error');
            expect(ADDRESS_TYPE.getAddressType).toHaveBeenCalledTimes(1);
        });
    });

    describe('POST /address-type', () => {
        it('should create a new address type', async () => {
            const newAddressType = { type: 'Work' };
            const createdAddressType = { id: 1, ...newAddressType };

            ADDRESS_TYPE.createAddType.mockResolvedValue(createdAddressType);

            const response = await request(app).post('/address-type').send(newAddressType);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(createdAddressType);
            expect(ADDRESS_TYPE.createAddType).toHaveBeenCalledWith(newAddressType);
        });

        it('should handle creation errors correctly', async () => {
            ADDRESS_TYPE.createAddType.mockRejectedValue(new Error('Creation error'));

            const response = await request(app).post('/address-type').send({});

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Creation error');
            expect(ADDRESS_TYPE.createAddType).toHaveBeenCalledTimes(1);
        });
    });

    describe('PUT /address-type/:id', () => {
        it('should update an existing address type', async () => {
            const id = 1;
            const updateData = { type: 'Office' };
            const updatedAddressType = { id, ...updateData };

            ADDRESS_TYPE.updateAddType.mockResolvedValue(updatedAddressType);

            const response = await request(app).put(`/address-type/${id}`).send(updateData);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(updatedAddressType);
            expect(ADDRESS_TYPE.updateAddType).toHaveBeenCalledWith(id, updateData);
        });

        it('should handle update errors correctly', async () => {
            ADDRESS_TYPE.updateAddType.mockRejectedValue(new Error('Update error'));

            const response = await request(app).put('/address-type/1').send({});

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Update error');
            expect(ADDRESS_TYPE.updateAddType).toHaveBeenCalledTimes(1);
        });
    });

    describe('DELETE /address-type/:id', () => {
        it('should delete an existing address type', async () => {
            const id = 1;
            const deleteResult = { message: 'Address type deleted successfully' };

            ADDRESS_TYPE.deleteAddType.mockResolvedValue(deleteResult);

            const response = await request(app).delete(`/address-type/${id}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(deleteResult);
            expect(ADDRESS_TYPE.deleteAddType).toHaveBeenCalledWith(id);
        });

        it('should handle deletion errors correctly', async () => {
            ADDRESS_TYPE.deleteAddType.mockRejectedValue(new Error('Deletion error'));

            const response = await request(app).delete('/address-type/1');

            expect(response.statusCode).toBe(500);
            expect(response.text).toBe('Deletion error');
            expect(ADDRESS_TYPE.deleteAddType).toHaveBeenCalledTimes(1);
        });
    });
});
