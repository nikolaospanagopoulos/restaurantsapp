import express from "express";

//import dotenv so that we can add environment variables
import dotenv from "dotenv";

//import routes
import RestaurantRoutes from "./Routes/RestaurantRoutes/RestaurantRoutes.js";
import DishRoutes from "./Routes/DishRoutes/DishRoutes.js";
//import database connection function
import { connectDB } from "./Config/db.js";

//import custom logging middleware
import { logger } from "./Middleware/logger.js";

//import custom error middleware
import { errorHandler } from "./Middleware/error.js";

dotenv.config();

const app = express();

//connect to database
connectDB();

//mount middleware
app.use(logger);

//use express body parser
app.use(express.json());

app.use("/api/v1/restaurants", RestaurantRoutes);
app.use("/api/v1/dishes", DishRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `app running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});

//handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`unhandeled rejection: ${err.message}`);
  //close server & exit process
  server.close(() => process.exit(1));
});
