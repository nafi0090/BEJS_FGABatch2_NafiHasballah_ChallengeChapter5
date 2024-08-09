const TRANSACTIONS = require('../models/transaction.model');
const TRANSACTIONS_TYPE = require('../models/transaction_type.model');

const indexTransaction = async (req, res) => {
    try {
        const result = await TRANSACTIONS.getAllTrans();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createTransaction = async (req, res) => {
    try {
        const add_data = req.body;
        const result = await TRANSACTIONS.createTrans(add_data);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updatedTransaction = async (req, res) => {
    try{
        const { id } = req.params;
        const data_update = req.body;
        const result = await TRANSACTIONS.updateTrans(parseInt(id), data_update);
        res.json(result);
    }catch (err){
        res.status(500).send(err.message);
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TRANSACTIONS.deleteTrans(parseInt(id));
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const indexTransType = async (req, res) => {
    try {
        const result = await TRANSACTIONS_TYPE.getAllTransType();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createTransType = async (req, res) => {
    try {
        const add_data = req.body;
        const result = await TRANSACTIONS_TYPE.createTransType(add_data);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updatedTransType = async (req, res) => {
    try{
        const { id } = req.params;
        const data_update = req.body;
        const result = await TRANSACTIONS_TYPE.updateTransType(parseInt(id), data_update);
        res.json(result);
    }catch (err){
        res.status(500).send(err.message);
    }
};

const deleteTranstype = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TRANSACTIONS_TYPE.deleteTransType(parseInt(id));
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    indexTransaction,
    createTransaction,
    updatedTransaction,
    deleteTransaction,
    indexTransType,
    createTransType,
    updatedTransType,
    deleteTranstype
};