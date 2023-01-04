const mongoose = require('mongoose');

const editionSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true , minlength: 4 },
    presentation: { type: String, required: true, minlength: 10 },
    winner: { type: String, required: true, minlength: 3 },
    date: {type: Date, required: true, },
    inscription: {type: Date, required: true},
    condition: { type: String, required: true},
    process: { type: String, required: true},
  }
);

module.exports = mongoose.model('Edition', editionSchema);