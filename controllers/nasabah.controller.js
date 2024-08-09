const NASABAH = require('../models/nasabah.model');
const MOTHER_NASABAH = require('../models/mother_nasabah.model');

const indexNasabah = async ( req, res) => {
    try {
        const result = await NASABAH.getAllNasabah();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createNasabah = async (req, res) => {
    try {
        const nasabahData = req.body;
        const result = await NASABAH.createNasabah(nasabahData);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updatedNasabah = async (req, res) => {
    try{
        const { id } = req.params;
        const data_update = req.body;
        const result = await NASABAH.updateNasabah(parseInt(id), data_update);
        res.json(result);
    }catch (err){
        res.status(500).send(err.message);
    }
};

const deleteNasabah = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await NASABAH.deleteNasabah(parseInt(id));
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const indexMotherNasabah = async (req, res) => {
    try {
        const result = await MOTHER_NASABAH.getMotherNasabah();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createMotherNasabah = async (req, res) => {
    try {
        const mother_nasabah_data = req.body;
        const result = await MOTHER_NASABAH.createMotherNasabah(mother_nasabah_data);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updatedMotherNasabah = async (req, res) => {
    try{
        const { id } = req.params;
        const data_update = req.body;
        const result = await MOTHER_NASABAH.updateMotherNasabah(parseInt(id), data_update);
        res.json(result);
    }catch (err){
        res.status(500).send(err.message);
    }
};

const deleteMotherNasabah = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await MOTHER_NASABAH.deleteMotherNasabah(parseInt(id));
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    indexNasabah, 
    createNasabah,
    updatedNasabah,
    deleteNasabah,
    indexMotherNasabah,
    createMotherNasabah,
    updatedMotherNasabah,
    deleteMotherNasabah
};