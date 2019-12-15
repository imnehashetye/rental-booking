const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: [128, 'Too Long'],
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
    },
    street: {
        type: String,
        required: true,
        min: [4, 'Too Short'],
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
    },
    image: {
        type: String,
        required: true,
    },
    bedrooms: Number,
    description: {
        type: String,
        required: true,
    },
    daily: Number,
    shared: Boolean,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Rental', rentalSchema);