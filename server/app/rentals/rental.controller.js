const Rental = require('../../models/rental');


async function rental(req, res) {
    try {
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
        // }).save();
        // console.log('datatttttttttttttttttt', data);
        return res.json(data);
    } catch (err) {
        console.log('eeeeeeeeeeeeee', err);
    }
}

module.exports = {
    rental,
};