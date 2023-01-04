const EditionModel = require('../models/edition');
const ObjectID = require('mongoose').Types.ObjectId;

exports.readEditions = (req, res, next) => {
    EditionModel.find((error, docs) => {
        if(!error) {
            res.send(docs);
        } else {
            console.log('Error to get data :' + error);
        }
    }).sort({ createdAt: -1 });
}

exports.readEdition = (req, res, next) => {
    const { id } = req.body
    if (!ObjectID.isValid(id)) {
        return res.status(400).json('ID Unknown : ' + id);
    }
    EditionModel.findById(id, (error, docs) => {
        if (!error) {
            return res.json(docs);
        } else {
            console.log('ID unkown : ' + error)
        }
    }).select();
}

exports.createEdition = async (req, res, next) => {
    const { name, presentation, winner, date, inscription, condition, process } = req.body
    const newEdition = new EditionModel( {
        name: name,
        presentation: presentation,
        winner: winner,
        date: date,
        inscription: inscription,
        condition: condition,
        process: process,
    });

    try {
        const edition = await newEdition.save();
        return res.status(201).json(edition);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}