import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        match: [
            /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
            "Please add a valid email",
        ],
        required: [true, "Please add a valid email address"],
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: [6, 'A password should be more than 6 characters long']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'owner', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export { User }