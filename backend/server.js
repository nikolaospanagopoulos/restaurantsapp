import express from 'express'

//import dotenv so that we can add environment variables
import dotenv from 'dotenv'

//import routes
import RestaurantRoutes from './Routes/RestaurantRoutes/RestaurantRoutes.js'

dotenv.config()

const app = express()

app.use("/api/v1/restaurants",RestaurantRoutes)


app.get('/',(req,res) => {
    res.send("Api is running")
})


const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`app running in ${process.env.NODE_ENV} on port ${process.env.PORT}`)
})