import express from "express";
import {
  register,
  login,
  getMe,
  updateUserDetails,
  updatePassword,
  forgotPassword,
  changePassword
} from "../../Controllers/authControllers/authControllers.js";
//import protect and special roles middleware
import { protect } from "../../Middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/forgotpassword").post(forgotPassword);
router.route("/updatepassword").put(protect, updatePassword);
router.route("/updatedetails").put(protect, updateUserDetails);
router.route("/resetpassword/:resettoken").put(changePassword)
export default router;
