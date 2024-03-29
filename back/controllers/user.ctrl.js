const UserModel = require('../models/user');
const ObjectID = require('mongoose').Types.ObjectId; // pour vérifier que le paramêtre existe déjà dans la BDD

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
}

exports.userInfo = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    }
    UserModel.findById(req.params.id, (error, docs) => {
        if (!error) {
            return res.json(docs);
        } else {
            console.log('ID unkown : ' + error)
        }
    }).select('-email');
}

exports.updateUser = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    } else {
        try {
            UserModel.findOneAndUpdate(
                {_id: req.params.id},
                {$set: {bio: req.body.bio}},
                {new: true, upsert: true, setDefaultsOnInsert: true},
                (error, docs) => {
                    if (!error) {
                        return res.status(200).send(docs);
                    } else {
                        return res.status(500).json({message : error});
                    }
                }
            )
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
}

exports.deleteUser = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json('ID Unknown : ' + req.params.id);
    }
    try {
        await UserModel.remove({_id : req.params.id}).exec();
        return res.status(200).json({ message: "User sucessfully deleted."});
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}