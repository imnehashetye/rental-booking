const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    totalPrice: Number,
    days: Number,
    daily: Number,
    guests: Number,
    end_date: {
        type: Date,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rental_id: {
        type: Schema.Types.ObjectId,
        ref: 'Rental',
        required: true,
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    deleted_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    deleted_on: {
        type: Date,
        default: null,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

module.exports = mongoose.model('Booking', bookingSchema);