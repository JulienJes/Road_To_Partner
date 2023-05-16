const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    twitchId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, unique: true , minlength: 3 },
    email: { type: String, required: true, unique: true },
    logo: {type: String, default: `http://localhost:${process.env.PORT_FRONT}/uploads/profil/default-user-pic.png` },
    bio: {type: String, maxlenght: 1024 },
    editions: { type: [String] },
    admin: { type: Boolean, default: false},
    refreshToken: {type: String}
  }
);

module.exports = mongoose.model('User', userSchema);