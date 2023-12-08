const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    email: {
        String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must be a valid email address!']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    readMes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ReadMe'
        }
    ]
    // Add pinned ReadMes later
});

// Hashes password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Checks to see if the given password is valid
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;