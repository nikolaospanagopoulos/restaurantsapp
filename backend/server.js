import express from "express";
import path from 'path'
//import dotenv so that we can add environment variables
import dotenv from "dotenv";

//import routes
import RestaurantRoutes from "./Routes/RestaurantRoutes/RestaurantRoutes.js";
import DishRoutes from "./Routes/DishRoutes/DishRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes/AuthRoutes.js"
import UserRoutes from './Routes/UserRoutes/UserRoutes.js'
import OrderRoutes from './Routes/OrderRoutes/OrderRoutes.js'
//import database connection function
import { connectDB } from "./Config/db.js";

//import custom logging middleware
import { logger } from "./Middleware/logger.js";

//import custom error middleware 
import { errorHandler } from "./Middleware/error.js";

//import cookie parser to send jwt in cookie
import cookieParser from 'cookie-parser'
import { addOrderItems } from "./Controllers/orderControllers/orderControllers.js";
dotenv.config('./');

const app = express();

//connect to database
connectDB();

//mount middleware
app.use(logger);

//use express body parser
app.use(express.json());

//use cookie parser
app.use(cookieParser())
app.use("/api/v1/restaurants", RestaurantRoutes);
app.use("/api/v1/dishes", DishRoutes);
app.use("/api/v1/auth",AuthRoutes)
app.use("/api/v1/users",UserRoutes)
app.use("/api/v1/orders",OrderRoutes)
app.get('/api/v1/config/paypal',(req,res) => 
res.send(process.env.PAYPAL_CLIENT_ID)
)

//make uploads a static folder
const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
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
