import mongoose from 'mongoose'

//import bcrypt to hash the password
//we use bcryptjs because it's better than bcrypt
import bcrypt from 'bcryptjs'

//import jwt token
import jwt from 'jsonwebtoken'



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
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: [6, 'A password should be more than 6 characters long'],
        select: false
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
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
}, {
    timestamps: true
})


//encrypt user password
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//Sign JWT Token
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE
    })
}

const User = mongoose.model('User', userSchema)

export { User }