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
        // match: [/^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i],
    },
    password: {
        type: String,
        required: 'Password is required',
        min: [4, 'Too Short'],
        max: [32, 'Too Long'],
    },
    createdBy: {
        type: Number,
        // required: true,
    },
    rentals: [{
        type: Schema.Types.ObjectId,
        ref: 'Rental',
    }],
    deletedBy: {
        type: Number,
    },
    deletedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updatedAt',
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