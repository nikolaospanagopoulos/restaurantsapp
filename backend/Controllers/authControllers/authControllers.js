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
    res.status(200).json({success:true,token})
})

//auth user
//public
//POST api/v1/auth/login