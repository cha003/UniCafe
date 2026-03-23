const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    studentId: String,
    items: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'picked-up'],
        default: 'pending'
    },
    pickupTime: Date,
    queuePosition: {
        type: Number,
        default: 0
    },
    estimatedWaitTime: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
