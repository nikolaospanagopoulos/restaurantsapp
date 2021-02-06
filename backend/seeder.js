//import fs module to read files
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";

import path from "path";

//bring the models
import { Restaurant } from "./Models/RestaurantModel.js";
import { Dish } from "./Models/DishModel.js";

//load env variables
dotenv.config();

//conect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//it allows us to use the __dirname with modules
const __dirname = path.resolve();

//read json files
const restaurants = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/_data/restaurants.json`, "utf-8")
);
const dishes = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/_data/dishes.json`, "utf-8")
);

//import to database

const importData = async () => {
  try {
    //await Restaurant.create(restaurants);
    await Dish.create(dishes);
    console.log("data imported");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

//delete from database
const deleteData = async () => {
  try {
    await Restaurant.deleteMany();
    await Dish.deleteMany();
    console.log("data deleted");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

//execute function from terminal

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
