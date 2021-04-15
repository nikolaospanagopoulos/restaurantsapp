import express from "express";

//import protect and roles authorize  middleware
import { protect, authorize } from "../../Middleware/auth.js";
import {advancedResults} from '../../Middleware/advancedResults.js'
import {Order} from '../../Models/OrderModel.js'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  getMyOrders,
  updateOrderToDelivered
} from "../../Controllers/orderControllers/orderControllers.js";
const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect,authorize('admin','owner'),advancedResults(Order),getOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect,authorize('owner','admin'), updateOrderToDelivered);
export default router;
