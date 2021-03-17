import express from "express";

import { advancedResults } from "../../Middleware/advancedResults.js";

import { User } from "../../Models/UserModel.js";

import { protect, authorize } from "../../Middleware/auth.js";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../Controllers/userControllers/userControllers.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.route("/").get(advancedResults(User), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
