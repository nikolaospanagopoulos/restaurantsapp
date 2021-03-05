import mongoose from "mongoose";

//import slugify in order to make a slug of the name
import slugify from "slugify";

//import geocoder configuration
import { geocoder } from "../Utilis/geocoder.js";

//import review schema
import { reviewSchema } from './ReviewSchema.js'

//create the restaurant Schema

const RestaurantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, "a restaurant must have a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Restaurant name cannot be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [600, "description cannot be more than 600 characters"],
    },
    website: {
      type: String,
      match: [
        /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Please add a valid https website",
      ],
    },
    phone: {
      type: String,
      maxlength: [15, "Phone number should not be longer than 15 characters"],
      required: [true, "Please add a phone number"],
    },
    email: {
      type: String,
      match: [
        /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
        "Please add a valid email",
      ],
      required: [true, "Please add a valid email address"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      //GeoJson Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      streetNumber: String,
      city: String,
      zipcode: String,
      country: String,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    photo2: {
      type: String,
      default: "no-photo.jpg",
    },
    photo3: {
      type: String,
      default: "no-photo.jpg",
    },
    photo4: {
      type: String,
      default: "no-photo.jpg",
    },
    vegan: {
      type: Boolean,
      default: false,
    },
    fusion: {
      type: Boolean,
      default: false,
    },
    traditional: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//create restaurant slug
RestaurantSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//geocode and create location fields
RestaurantSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    streetNumber: this.address.split(" ")[0],
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  console.log(loc);
  //we dont need input address because we have formatted one55236
  this.address = undefined;
  next();
});

//cascade delete of everything in the restaurant when restaurant is deleted
RestaurantSchema.pre("remove", async function (next) {
  console.log(
    `dishes are being removed from restaurant with the id of ${this.id}`
  );
  await this.model("Dish").deleteMany({ restaurant: this._id });
  next();
});

//populate with virtuals
RestaurantSchema.virtual("dishes", {
  ref: "Dish",
  localField: "_id",
  foreignField: "restaurant",
  justOne: false,
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export { Restaurant };
