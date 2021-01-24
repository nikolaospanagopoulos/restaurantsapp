import express from 'express'
import { createRestaurant, deleteRestaurant, getRestaurant, getRestaurants, updateRestaurant } from '../../Controllers/RestaurantControllers/RestaurantControllers.js'
const router = express.Router()

router.route('/').get(getRestaurants).post(createRestaurant)
router.route('/:id').get(getRestaurant).put(updateRestaurant).delete(deleteRestaurant)
export default router 