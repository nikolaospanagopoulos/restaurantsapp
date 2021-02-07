import { ErrorResponse } from "../../Utilis/errorResponse.js";
import { asyncHandler } from "../../Middleware/async.js";
import { Dish } from "../../Models/DishModel.js";
import { Restaurant } from "../../Models/RestaurantModel.js";
//get all dishes
//GET /api/v1/dishes
//GET /api/v1/restaurants/:restaurantId/dishes
//Public
export const getDishes = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.restaurantId) {
    query = await Dish.find({ restaurant: req.params.restaurantId });
  } else {
    query = await Dish.find().populate({
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

//get a dish
//GET /api/v1/dishes/:id
//Public

export const getDish = asyncHandler(async (req, res, next) => {
  const dish = await Dish.findById(req.params.id).populate({
    path: "restaurant",
    select: "name description",
  });
  if (!dish) {
    return next(new ErrorResponse(`No dish with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: dish,
  });
});

//add a dish
//POST /api/v1/restaurants/restaurantId/dishes
//Private

export const addDish = asyncHandler(async (req, res, next) => {
  //we take the restaurant id from the params and put it in the body
  req.body.restaurant = req.params.restaurantId;

  const restaurant = await Restaurant.findById(req.params.restaurantId);

  if (!restaurant) {
    return next(
      new ErrorResponse(
        `No restaurant with id of ${req.params.restaurantId}`,
        404
      )
    );
  }

  const dish = await Dish.create(req.body);

  res.status(201).json({
    success: true,
    data: dish,
  });
});

//update a dish
//PUT /api/v1/dishes/:id
//Private

export const updateDish = asyncHandler(async (req, res, next) => {
  let dish = await Dish.findById(req.params.id);

  if (!dish) {
    return next(
      new ErrorResponse(`No dish with id of ${req.params.id}`, 404)
    );
  }

  dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: dish,
  });
});

//delete a dish
//DELETE /api/v1/dishes/:id
//Private

export const deleteDish = asyncHandler(async (req, res, next) => {
  const dish = await Dish.findById(req.params.id);

  if (!dish) {
    return next(
      new ErrorResponse(`No dish with id of ${req.params.id}`, 404)
    );
  }

  await dish.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
