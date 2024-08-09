const ACCOUNT = require('../models/account.model');
const ACCOUNT_TYPE = require('../models/account_type.model');

// ACCOUNT
const indexAcc = async (req, res) => {
    try {
        const result = await ACCOUNT.getAllAcc();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createAccount = async (req, res) => {
    try {
        const data_add = req.body;
        const result = await ACCOUNT.createAccount(data_add);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const update_data = req.body;
        const result = await ACCOUNT.updateAccount(parseInt(id), update_data);
        res.json(result);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ACCOUNT.deleteAccount(parseInt(id));
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// ACCOUNT TYPE
const indexAccType = async (req, res) => {
    try {
        const result = await ACCOUNT_TYPE.getAllAccType();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createAccType = async (req, res) => {
    try {
        const add_data = req.body;
        const result = await ACCOUNT_TYPE.createAccType(add_data);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updatedAccType = async (req, res) => {
    try{
        const { id } = req.params;
        const data_update = req.body;
        const update_data = await ACCOUNT_TYPE.updateAccType(parseInt(id), data_update);
        res.json(update_data);
    }catch (err){
        res.status(500).send(err.message);
    }
};

const deleteAccType = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedata = await ACCOUNT_TYPE.deleteAccType(parseInt(id));
        res.json(deletedata);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    indexAcc,
    createAccount,
    updateAccount,
    deleteAccount,
    indexAccType,
    createAccType,
    updatedAccType,
    deleteAccType
};