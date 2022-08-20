const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
    name: String,
    author: {
        type: ObjectId,
        ref: "Author123",
    },
    price: Number,
    ratings: Number,
    publisher: {
        type: ObjectId,
        ref: "Publisher123",
    },
    isHardCover:{default: false}

}, { timestamps: true });

module.exports = mongoose.model('Book123', bookSchema)