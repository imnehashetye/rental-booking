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
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    user_rental_booking_id: [{
        type: Schema.Types.ObjectId,
        ref: 'UserRentalBookings',
    }],
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

module.exports = mongoose.model('Rental', rentalSchema);