const moment = require('moment');
const mongoose = require('mongoose');
ObjectID = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    userID:{
        type: ObjectID,
        ref: 'user01'
    },
    productID:{
        type: ObjectID,
        ref: 'product01'
    },
    isFreeAppUser:{
        type:Boolean,
    },
    amount:{
        type: Number,
        default:0
    },
    Date: Date
    
}, { timestamps: true });

module.exports = mongoose.model('order01', orderSchema)