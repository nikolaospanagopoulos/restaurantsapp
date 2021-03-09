import { ErrorResponse } from '../../Utilis/errorResponse.js'
import { asyncHandler } from '../../Middleware/async.js'
import { User } from '../../Models/UserModel.js'


//register user
//public
//POST api/v1/auth/register
export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body

    //create user
    const user = await User.create({
        name,
        email,
        password,
        role
    })

    //CREATE TOKEN
    const token = user.getSignedJwtToken()
    res.status(200).json({ success: true, token })
})

//auth user
//public
//POST api/v1/auth/login
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    //validate
    if (!email || !password) {
        return next(new ErrorResponse('Please Provide an email and a password', 400))
    }

    //check if user exists
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 401))
    }

    //check password if match
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse('Invalid Credentials', 401))
    }

    //create token
    const token = user.getSignedJwtToken()

    res.status(200).json({ success: true, token })
})