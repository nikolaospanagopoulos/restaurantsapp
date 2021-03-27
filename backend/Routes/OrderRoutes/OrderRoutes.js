import express from "express";

//import protect and roles authorize  middleware
import { protect, authorize } from "../../Middleware/auth.js";
import {addOrderItems} from '../../Controllers/orderControllers/orderControllers.js'
const router = express.Router()

router.route('/').post(protect,addOrderItems)


export default router