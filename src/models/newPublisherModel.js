const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: String,
    headQuarter: String,

}, { timestamps: true });

module.exports = mongoose.model('Publisher123', publisherSchema)