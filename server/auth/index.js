const jwt = require('jsonwebtoken');
const { User } = require('../config/sqlDB');
const config = require('../config/dev');

async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;
        console.log('ttttttttttttttttttt', token);
        if (!token) {
            return res.status(401).send({ msg: 'Not Authorized you need to login to get access' });
        }

        const data = await jwt.verify(token.split(' ')[1], config.SECRET);
        console.log('data', data);
        const user = await User.findById(data.userId);

        if (!user) {
            return res.status(401).send({ msg: 'Not Authorized you need to login to get access' });
        };
        req.user = user;
        console.log('req.user', req.user);
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    authMiddleware,
};