const mongoose = require('mongoose');
//const { checkout } = require('../routes');

const petSchema = new mongoose.Schema({
    name: String,
    specie: String,
    color: String,
    characteristics: String,
    accesories: String,
    coordinates: { lat: Number, lng: Number },
    lastLocation: String,
    numUser: Number,
    proced: Boolean,
    imgUrl: String,
    completed: Boolean,
    sex: String
});

module.exports = mongoose.model('pets', petSchema);