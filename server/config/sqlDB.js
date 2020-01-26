const User = require('../models/user');
const Rental = require('../models/rental');
const Booking = require('../models/booking.model');
const UserRentalBookings = require('../models/userRentalBookingMap');

module.exports = {
    User,
    Rental,
    Booking,
    UserRentalBookings,
};