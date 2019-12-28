const jwt = require('jsonwebtoken');
const { User, Rental } = require('../../config/sqlDB');
const config = require('../../config/dev');

async function auth(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).send({ msg: 'Email Or Password Missing' });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(422).send({ msg: 'User does not exist' });
        }

        const data = await user.isSamePassword(user.password, password);
        if (!data) return res.status(422).send({ msg: 'Invalid Passowrd' });

        const token = jwt.sign({
            userId: user._id,
            username: user.username,
        }, config.SECRET, { expiresIn: 60 * 60 });

        return res.json(token);
    } catch (err) {
        return next(err);
    }
}

async function create(req, res, next) {
    try {
        const {
            username,
            email,
            password,
            passwordConfirmation
        } = req.body;

        if (!email || !password) {
            return res.status(422).send({ msg: 'Email Or Password Missing' });
        }

        if (password !== passwordConfirmation) {
            return res.status(422).send({ msg: 'Password & PasswordConfirmation does not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).send({ msg: 'Email already present' });
        }

        const data = await User({
            username,
            email,
            password,
        }).save();

        return res.json();
    } catch (err) {
        console.log('eeeeeeeeeeeeee', err);
        return next(err);
    }
}

module.exports = {
    auth,
    create,
};