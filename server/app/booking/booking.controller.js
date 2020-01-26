const { User, Rental, UserRentalBookings, Booking } = require('../../config/sqlDB');

exports.create = async function(req, res, next) {
    try {
        console.log('req.bodyttttttttttttttttttt', req.body)
        const data = await Rental.findById(req.body.rental._id)
            .populate('created_by')

        // if (data.created_by._id === req.user._id) {
        //     return res.status(422).send({ msg: 'cannot create booking on your won rental' });
        // }

        const bookingCount = await Booking.count({
            $or: [
                { start_date: { $gte: req.body.startDate, $lte: req.body.endDate } },
                { end_date: { $lte: req.body.endDate, $gte: req.body.startDate } },
            ]
        });

        if (bookingCount > 0) {
            return res.status(422).send({ msg: 'Booking Dates already taken' });
        }

        const bookingData = await Booking({
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            days: req.body.days,
            guests: req.body.guests,
            totalPrice: req.body.totalPrice,
            created_by: req.user._id,
            rental_id: req.body.rental._id,
        }).save();

        await UserRentalBookings({
            booking_id: bookingData._id,
            user_id: req.user._id,
            created_by: req.user._id,
            rental_id: req.body.rental._id,
        }).save();

        return res.json();

    } catch (err) {
        return next(err);
    }
}