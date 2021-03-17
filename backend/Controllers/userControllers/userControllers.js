//bring custom error class
import { ErrorResponse } from "../../Utilis/errorResponse.js";

//import async await middleware
import { asyncHandler } from "../../Middleware/async.js";

//import model
import { User } from '../../Models/UserModel.js'

//get all users
//admin only
//GET api/v1/users
export const getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

//get single
//admin only
//GET api/v1/users/:id
export const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    res.status(200).json({
        success:true,
        data:user
    })
})

//create user
//admin only
//POST api/v1/users
export const createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)

    res.status(201).json({
        success:true,
        data:user
    })
})

//update user
//admin only
//PUT api/v1/users/:id
export const updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        data:user
    })
})


//delete user
//admin only
//DELETE api/v1/users/:id
export const deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        data:{}
    })
})
