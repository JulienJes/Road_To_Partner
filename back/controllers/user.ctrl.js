const UserModel = require('../models/user');
const ObjectID = require('mongoose').Types.ObjectId; // pour vérifier que le paramêtre existe déjà dans la BDD
const axios = require('axios');

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

exports.deleteUser = async (req, res) => {
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

exports.twitchCallback = async (req, res) => {
    try {
        const accessToken = req.query.access_token;

        const response = await axios.get("https://api.twitch.tv/helix/users", {
        headers: {
            "Client-ID": process.env.TWITCH_CLIENT_ID,
            "Authorization": `Bearer ${accessToken}`,
        },
        });

        const userData = response.data.data[0];
        let user = await UserModel.findOne({ twitchId: userData.id });

        if (!user) {
            const newUser = new UserModel({
                twitchId: userData.id,
                displayName: userData.display_name,
                email: userData.email,
                logo: userData.profile_image_url,
                // ajouter des champs supplémentaires si nécessaire
            });

            await newUser.save();
        } else {
            user.displayName = userData.display_name;
            user.email = userData.email;
            user.logo = userData.profile_image_url;
            user.followersCount = userData.followersCount;
            user.isLive = userData.isLive;

            await user.save();
        }

        // - Créer et envoyez un JWT
        // - Créer et envoyez un cookie avec le JWT
        // - Rediriger vers la page d'accueil de l'application front-end

    } catch (error) {
        console.error("Erreur lors de l'authentification Twitch", error);
        res.status(500).json({ message: "Erreur lors de l'authentification Twitch" });
    }
};
