const UserModel = require('../models/user');
const axios = require('axios');
const jwt = require("jsonwebtoken");

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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Créer et envoyez un cookie avec le JWT
        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            secure: false, // set to true if your using https
            httpOnly: false, // set to true for prod
            sameSite: "lax"
        });

        console.log("JWT cookie set:", token)

        // Rediriger vers la page d'accueil de l'application front-end
        res.redirect(`http://localhost:${process.env.PORT_FRONT}`);

    } catch (error) {
        console.error("Erreur lors de l'authentification Twitch", error);
        res.status(500).json({ message: "Erreur lors de l'authentification Twitch" });
    }
};