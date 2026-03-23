const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    studentId: String,
    vendorId: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String,
    sentiment: {
        type: String,
        enum: ['Positive', 'Neutral', 'Negative'],
        default: 'Neutral'
    },
    coinsEarned: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
