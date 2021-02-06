import { ErrorResponse } from "../../Utilis/errorResponse.js";
import { asyncHandler } from "../../Middleware/async.js";
import { Dish } from "../../Models/DishModel.js";

//get all dishes
//GET /api/v1/dishes
//GET /api/v1/restaurants/:restaurantId/dishes

export const getDishes = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.restaurantId) {
    query = Dish.find({ restaurant: req.params.restaurantId });
  } else {
    query = Dish.find().populate({
      path: "restaurant",
      select: "name description",
    });
  }

  const dishes = await query;

  res.status(200).json({
    success: true,
    count: dishes.length,
    data: dishes,
  });
});
