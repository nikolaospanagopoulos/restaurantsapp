import { ErrorResponse } from "../../Utilis/errorResponse.js";
import { asyncHandler } from "../../Middleware/async.js";
import { User } from "../../Models/UserModel.js";
import sgEmail from "@sendgrid/mail";
import crypto from 'crypto'
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

  console.log(user.email)
  try {

    sgEmail.setApiKey(process.env.SENDGRID_API_KEY)
    const message = {
      to: email,
      from: 'nikos4222@outlook.com.gr',
      subject: 'Welcome to our application',
      text: ` Dear ${name} we are very glad to welcome you into our family. We offer the best prices and the most amazing quality. There are restaurants here that offer you whatever it is you desire. Click here https://greekrestaurantsapp.herokuapp.com/ `,

    }
    await sgEmail.send(message)
    sendTokenResponse(user, 200, res)

  } catch (error) {
    console.log(error)
  }






})

//auth user
//public
//POST api/v1/auth/login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate
  if (!email || !password) {
    return next(
      new ErrorResponse("Please Provide an email and a password", 400)
    );
  }

  //check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  //check password if match
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});
// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

//get token from model create cookie and send
const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options, user).json({
    success: true,
    token,
  });
};

//get logged in user
//Private
//GET /api/v1/auth/me

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//update user details
//Private
//PUT /api/v1/auth/updatedetails

export const updateUserDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

//forgot password
//Private
//GET /api/v1/auth/me

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("there is no user with that email", 404));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;
console.log(resetUrl)
  sgEmail.setApiKey(process.env.SENDGRID_API_KEY)
  const message = {
    to: user.email,
    from: 'nikos4222@outlook.com.gr',
    subject: 'Password Reset',
    text: `click on the following link to reset your password https://greekrestaurantsapp.herokuapp.com/resetpassword/${resetToken} `,

  }
  try {

    await sgEmail.send(message)
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("email could not be sent", 500));
  }
});
//reset and change password
//put /api/v1/auth/resetpassword/:resettoken
export const changePassword = asyncHandler(async (req, res, next) => {
  //get hashed token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400))
  }
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendTokenResponse(user, 200, res)
})
