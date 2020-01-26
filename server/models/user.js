const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        min: [4, 'Too Short'],
        max: [32, 'Too Long'],
    },
    email: {
        type: String,
        min: [4, 'Too Short'],
        max: [32, 'Too Long'],
        required: 'Email is required',
        lowercase: true,
        unique: true,
        match: [/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/],
    },
    password: {
        type: String,
        required: 'Password is required',
        min: [4, 'Too Short'],
        max: [32, 'Too Long'],
    },
    created_by: {
        type: Number,
        default: null,
        // required: true,
    },
    deleted_by: {
        type: Number,
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

userSchema.methods = {
    async isSamePassword(hash, password) {
        return bcrypt.compareSync(password, hash);
    }
}

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
});

module.exports = mongoose.model('User', userSchema);