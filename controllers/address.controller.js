const ADDRESS = require('../models/address.model');
const ADDRESS_TYPE = require('../models/address_type.model');

// address
const indexAdd = async (req, res) => {
    try {
        const result = await ADDRESS.getAllAddress();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createAddress = async (req, res) => {
    try {
        const data_add = req.body;
        const result = await ADDRESS.createAdd(data_add);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const update_data = req.body;
        const result = await ADDRESS.updateAdd(parseInt(id), update_data);
        res.json(result);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deleteAdd = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ADDRESS.deleteAdd(parseInt(id));
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// address type
const indexAddType = async (req, res) => {
    try {
        const result = await ADDRESS_TYPE.getAddressType();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createAddType = async (req, res) => {
    try {
        const add_data = req.body;
        const result = await ADDRESS_TYPE.createAddType(add_data);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updatedAddType = async (req, res) => {
    try{
        const { id } = req.params;
        const data_update = req.body;
        const update_data = await ADDRESS_TYPE.updateAddType(parseInt(id), data_update);
        res.json(update_data);
    }catch (err){
        res.status(500).send(err.message);
    }
};

const deleteAddType = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedata = await ADDRESS_TYPE.deleteAddType(parseInt(id));
        res.json(deletedata);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    indexAdd,
    createAddress,
    updateAddress,
    deleteAdd,
    indexAddType,
    createAddType,
    updatedAddType,
    deleteAddType
};