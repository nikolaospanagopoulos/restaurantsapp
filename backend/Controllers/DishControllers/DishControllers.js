import { ErrorResponse } from "../../Utilis/errorResponse.js";
import { asyncHandler } from "../../Middleware/async.js";
import { Dish } from "../../Models/DishModel.js";
import { Restaurant } from "../../Models/RestaurantModel.js";
//get all dishes
//GET /api/v1/dishes
//GET /api/v1/restaurants/:restaurantId/dishes
//Public
export const getDishes = asyncHandler(async (req, res, next) => {
  if (req.params.restaurantId) {
    const { data } = res.advancedResults;
 
    const advanedDishesResults = data.filter(
      (dish) => req.params.restaurantId == dish.restaurant._id
    );
    res.status(200).json(advanedDishesResults);
  } else {
    res.status(200).json(res.advancedResults);
  }
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
  req.body.user = req.user.id;

  const restaurant = await Restaurant.findById(req.params.restaurantId);

  if (!restaurant) {
    return next(
      new ErrorResponse(
        `No restaurant with id of ${req.params.restaurantId}`,
        404
      )
    );
  }

  //make sure only the owner can update and the admin
  if (restaurant.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id:${req.user.id} is not the owner of this restaurant or an admin`,
        401
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
    return next(new ErrorResponse(`No dish with id of ${req.params.id}`, 404));
  }


  //make sure only the owner can update and the admin
  if (dish.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id:${req.user.id} is not authorized to update this dish`,
        401
      )
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
    return next(new ErrorResponse(`No dish with id of ${req.params.id}`, 404));
  }

   //make sure only the owner can update and the admin
   if (dish.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id:${req.user.id} is not authorized to delete this dish`,
        401
      )
    );
  }
  await dish.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
