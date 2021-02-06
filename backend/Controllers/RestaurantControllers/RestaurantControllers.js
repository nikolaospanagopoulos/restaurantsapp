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
  let query;
  //copy req.query
  const reqQuery = { ...req.query };

  //fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  //loop over removeFields and exclude them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);
  let queryStr = JSON.stringify(reqQuery);

  //add the $ symbol before the gt|gte|lt|lte|in operators so that they can work in the query

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  //find resource
  query = Restaurant.find(JSON.parse(queryStr)).populate('dishes');

  //select fields
  if (req.query.select) {
    //seperate string by coma and make an array and then use space to marge it back into a string
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sort
  if (req.query.sort) {
    //seperate string by coma and make an array and then use space to marge it back into a string
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 15;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Restaurant.countDocuments();

  query = query.skip(startIndex).limit(limit);
  //execute query
  const restaurants = await query;

  //pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.status(200).json({
    success: true,
    count: restaurants.length,
    pagination,
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
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(
      new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404)
    );
  }
  restaurant.remove()
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
    }).populate('dishes');
    console.log(loc2);
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  }
);
