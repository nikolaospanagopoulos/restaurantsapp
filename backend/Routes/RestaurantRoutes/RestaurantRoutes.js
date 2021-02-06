import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
  getRestaurantsWithinRadius,
} from "../../Controllers/RestaurantControllers/RestaurantControllers.js";

//include other resources routers
import DishRoutes from '../DishRoutes/DishRoutes.js'

const router = express.Router();

//reroute into other resource routes
router.use('/:restaurantId/dishes',DishRoutes)

router.route("/radius/:zipcode/:distance").get(getRestaurantsWithinRadius);

router.route("/").get(getRestaurants).post(createRestaurant);
router
  .route("/:id")
  .get(getRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant);
export default router;
