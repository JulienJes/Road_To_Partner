const EditionModel = require('../models/edition');

exports.readEdition = (req, res, next) => {
    EditionModel.find((error, docs) => {
        if(!error) {
            res.send(docs);
        } else {
            console.log('Error to get data :' + error);
        }
    }).sort({ createdAt: -1 });
}

exports.createEdition = async (req, res, next) => {
    const newEdition = new EditionModel( {
        name: req.body.name,
        presentation: req.body.presentation,
        winner: req.body.winner,
        date: req.body.date,
        inscription: req.body.inscription,
        condition: req.body.inscription,
        process: req.body.process,
    });

    try {
        const edition = await newEdition.save();
        return res.status(201).json(edition);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}