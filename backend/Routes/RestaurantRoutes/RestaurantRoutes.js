import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
  getRestaurantsWithinRadius,
} from "../../Controllers/RestaurantControllers/RestaurantControllers.js";

//import advanced results middleware
import {Restaurant} from '../../Models/RestaurantModel.js'
import { advancedResults } from "../../Middleware/advancedResults.js";

//include other resources routers
import DishRoutes from "../DishRoutes/DishRoutes.js";


//import protect and roles authorize middleware middleware
import {protect,authorize} from '../../Middleware/auth.js'
const router = express.Router();

//reroute into other resource routes
router.use("/:restaurantId/dishes", DishRoutes);
router.route("/radius/:zipcode/:distance").get(getRestaurantsWithinRadius);

router.route("/").get(advancedResults(Restaurant,'dishes'),getRestaurants).post(protect,authorize('admin'),createRestaurant);
router
  .route("/:id")
  .get(getRestaurant)
  .put(protect,authorize('owner','admin'),updateRestaurant)
  .delete(protect,authorize('admin'),deleteRestaurant);
export default router;
