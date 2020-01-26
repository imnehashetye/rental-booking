const mongoose = require('mongoose');
const { User, Rental } = require('../../config/sqlDB');

async function rental(req, res, next) {
    try {
        console.log('datatttttttttttttttttt', req.user);
        const data = await Rental.find({});
        // const data = await Rental({
        //     title: 'Central Apartment',
        //     city: 'Mumbai',
        //     street: 'Times Square',
        //     category: 'apartment',
        //     image: 'http://via.placeholder.com/350x250',
        //     bedrooms: 3,
        //     description: 'Very Nice Apartment',
        //     daily: 34,
        //     shared: false,
        //     created_by: req.user._id,
        // }).save();
        // console.log('datatttttttttttttttttt', data);
        return res.json(data);
    } catch (err) {
        return next(err);
    }
}

async function getrental(req, res, next) {
    try {

        const data = await Rental.aggregate([{
                    "$match": { _id: mongoose.Types.ObjectId(req.params.id) }
                },
                {
                    $lookup: {
                        from: "bookings", // collection name in db
                        localField: "_id",
                        foreignField: "rental_id",
                        as: "bookings"
                    }
                },
                {
                    $project: {
                        title: 1,
                        city: 1,
                        street: 1,
                        category: 1,
                        image: 1,
                        bedrooms: 1,
                        description: 1,
                        daily: 1,
                        shared: 1,
                        created_by: 1,
                        bookings: {
                            $filter: {
                                input: "$bookings",
                                as: "bookings",
                                cond: { $gte: ["$$bookings.end_date", new Date()] }
                            }
                        }
                    }
                }
            ])
            // const data = await Rental.findOne({ _id: req.params.id });
            // const data = await Rental.findOne({ _id: req.params.id })
            //     .populate('created_by')

        return res.json(data);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    rental,
    getrental,
};