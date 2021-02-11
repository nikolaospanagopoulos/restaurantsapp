import mongoose from "mongoose";
//create schema to add dishes in each restaurant

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a dish name"],
  },
  description: {
    type: String,
    required: [true, "A dish must have a description"],
  },
  price: {
    type: Number,
    required: [true, "A dish must have a price"],
  },
  vegan: {
    type: Boolean,
    required: [true, "A dish must have a category"],
  },
  vegeterian: {
    type: Boolean,
    required: [true, "A dish must have a category"],
  },
  traditional: {
    type: Boolean,
    required: [true, "A dish must have a category"],
  },
  chinese: {
    type: Boolean,
  },
  mexican: {
    type: Boolean,
  },
  greek: {
    type: Boolean,
  },
  italian: {
    type: Boolean,
  },
  available: {
    type: Number,
    required: [true, "A dish must be available or not"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

const Dish = mongoose.model("Dish", DishSchema);

export { Dish };
