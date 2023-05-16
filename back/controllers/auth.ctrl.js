const UserModel = require('../models/user');
const axios = require('axios');
const jwt = require("jsonwebtoken");

exports.twitchCallback = async (req, res) => {
    try {
        const twitchAccessToken = req.query.access_token;

        const response = await axios.get("https://api.twitch.tv/helix/users", {
        headers: {
            "Client-ID": process.env.TWITCH_CLIENT_ID,
            "Authorization": `Bearer ${twitchAccessToken}`,
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
                refreshToken: jwt.sign({ id: newUser._id }, process.env.REFRESH_TOKEN_SECRET)
                // ajouter des champs supplémentaires si nécessaire
            });

            await newUser.save();
        } else {
            user.displayName = userData.display_name;
            user.email = userData.email;
            user.logo = userData.profile_image_url;

            await user.save();
        }

        const jwtAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);

        user.refreshToken = refreshToken;
        await user.save();

        // Création et envoi des cookies
        res.cookie("token", jwtAccessToken, {
            path: '/',
            expires: new Date(Date.now() + 15 * 60 * 1000),
            secure: false, // set to true if your using https
            httpOnly: false, // set to true for prod
            sameSite: "lax"
        });
        res.cookie("refreshToken", refreshToken, {
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: false, // set to true if your using https
            httpOnly: false, // set to true for prod
            sameSite: "lax"
        });

        console.log("jwtAccessToken cookie set:", jwtAccessToken)
        console.log("refreshToken cookie set:", refreshToken)

        res.redirect(`http://localhost:${process.env.PORT_FRONT}`); // Redirection

    } catch (error) {
        console.error("Erreur lors de l'authentification Twitch", error);
        res.status(500).json({ message: "Erreur lors de l'authentification Twitch" });
    }
};

exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(403).json({ message: 'Authentication required' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' });

        const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        return res.status(200).json({ accessToken: newAccessToken });
    });
};

exports.logOut = (req, res) => {
    res.cookie('token', '', { path: '/', expires: new Date(0), secure: false, httpOnly: false, sameSite: "lax" });
    res.cookie('refreshToken', '', { path: '/', expires: new Date(0), secure: false, httpOnly: false, sameSite: "lax" });
    
    res.status(200).json({ message: 'User logged out' });
}