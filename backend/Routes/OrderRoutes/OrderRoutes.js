import express from "express";

//import protect and roles authorize  middleware
import { protect, authorize } from "../../Middleware/auth.js";
import {
  addOrderItems,
  getOrderById,
} from "../../Controllers/orderControllers/orderControllers.js";
const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);

export default router;
