const mongoose = require('mongoose');
//const { checkout } = require('../routes');

const collarSchema = new mongoose.Schema({
    locationHistory: [{lat: Number, lng: Number, date: Date }],
    petId: String,
    userId: String
});

module.exports = mongoose.model('collars', collarSchema);