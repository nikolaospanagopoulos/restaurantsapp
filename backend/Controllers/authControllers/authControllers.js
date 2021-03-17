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

    sendTokenResponse(user,200,res)
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

  sendTokenResponse(user,200,res)

    
})

//get token from model create cookie and send
const sendTokenResponse = (user, statusCode, res) => {
    //create token
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    })
   
}

//get logged in user
//Private
//GET /api/v1/auth/me

export const getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        data:user
    })
})