const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userRentalBookingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rental_id: {
        type: Schema.Types.ObjectId,
        ref: 'Rental',
    },
    booking_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking',
    }],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
}, { collection: 'user_rental_bookings' });

module.exports = mongoose.model('UserRentalBookings', userRentalBookingSchema);