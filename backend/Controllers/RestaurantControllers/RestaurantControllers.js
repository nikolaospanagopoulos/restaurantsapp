//import restaurant model
import { Restaurant } from "../../Models/RestaurantModel.js";

//bring custom error class
import { ErrorResponse } from "../../Utilis/errorResponse.js";

//import async await middleware
import { asyncHandler } from "../../Middleware/async.js";

//import geocoder configuration
import { geocoder } from "../../Utilis/geocoder.js";

//api/v1/restaurants
//GET request
//access:all
//get all restaurants
export const getRestaurants = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//api/v1/restaurants/:id
//GET request
//access:all
//get a restaurant
export const getRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id).populate(
    "dishes"
  );

  if (!restaurant) {
    return next(
      new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: restaurant,
  });
});
//api/v1/restaurants
//POST request
//access:admin,owner
//create a restaurant
export const createRestaurant = asyncHandler(async (req, res, next) => {
  //add user to req.body
  req.body.user = req.user.id;
  const restaurant = await Restaurant.create(req.body);

  res.status(201).json({
    success: true,
    data: restaurant,
  });
});

//api/v1/restaurants/:id
//PUT request
//access:admin,owner
//update a restaurant
export const updateRestaurant = asyncHandler(async (req, res, next) => {
  let restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    return next(
      new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404)
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

  restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  await restaurant.save()
  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

//api/v1/restaurants/:id
//DELETE request
//access:admin
//delete a restaurant
export const deleteRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(
      new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404)
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

  restaurant.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});

//api/v1/restaurants/radius/:zipcode/:distance
//GET restaurants in radius
//access:public
//find restaurants close to the user
export const getRestaurantsWithinRadius = asyncHandler(
  async (req, res, next) => {
    const { zipcode, distance } = req.params;

    //get latitude and longitude
    const loc = await geocoder.geocode(zipcode);
    const loc2 = loc.filter(function (el) {
      return el.countryCode == "gr";
    });
    const lat = loc2[0].latitude;
    const lng = loc2[0].longitude;

    //calculate the radius of earth
    //divide distance by earth radius
    //earth radius is 6,378.1 km

    const radius = distance / 6378;
    const restaurants = await Restaurant.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    }).populate("dishes");

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  }
);

//api/v1/restaurants/:id/reviews
//Create a review
//access:private
//delete a restaurant
export const postARestaurantReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body
  const restaurant = await Restaurant.findById(req.params.id);
  console.log(restaurant.address)
  if (restaurant) {
   const alreadyReviewed = restaurant.reviews.find(r => r.user.toString() === req.user.toString())
   console.log(restaurant.reviews)
    if (alreadyReviewed) {
      res.status(400)
      new ErrorResponse(`You have already posted a review`, 400)
    }
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user:req.user._id
  }
  console.log(review)
  restaurant.reviews.push(review)
  restaurant.numReviews = restaurant.reviews.length
  
  
  await restaurant.save()
  res.status(201).json({message:'reviewAdded'})

})