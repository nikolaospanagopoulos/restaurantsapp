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
  const restaurants = await Restaurant.find({});
  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants,
  });
});

//api/v1/restaurants/:id
//GET request
//access:all
//get a restaurant
export const getRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

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
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
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

//api/v1/restaurants/:id
//DELETE request
//access:admin
//delete a restaurant
export const deleteRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndRemove(req.params.id);

  if (!restaurant) {
    return next(
      new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404)
    );
  }

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
    const loc2 = loc.filter(function(el){
       return el.countryCode == 'gr'
    })
    const lat = loc2[0].latitude;
    const lng = loc2[0].longitude;
    

    //calculate the radius of earth
    //divide distance by earth radius
    //earth radius is 6,378.1 km

    const radius = distance/6378;
    const restaurants = await Restaurant.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
      
    });
console.log(loc2)
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  }
);
