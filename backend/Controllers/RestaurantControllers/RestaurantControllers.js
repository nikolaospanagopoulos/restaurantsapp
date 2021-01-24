
//api/v1/restaurants
//GET request
//access:all
//get all restaurants
export const getRestaurants =  (req,res,next) => {
    res.status(200).json({success:true,message:'show all restaurants'})
    
}


//api/v1/restaurants/:id
//GET request
//access:all
//get a restaurant
export const getRestaurant =  (req,res,next) => {
    res.status(200).json({success:true,message:'show a restaurant'})
    
}

//api/v1/restaurants
//POST request
//access:admin,owner
//create a restaurant
export const createRestaurant =  (req,res,next) => {
    res.status(200).json({success:true,message:'create a restaurant'})
    
}



//api/v1/restaurants/:id
//PUT request
//access:admin,owner
//update a restaurant
export const updateRestaurant =  (req,res,next) => {
    res.status(200).json({success:true,message:'update a restaurant'})
    
}

//api/v1/restaurants/:id
//DELETE request
//access:admin
//delete a restaurant
export const deleteRestaurant =  (req,res,next) => {
    res.status(200).json({success:true,message:'delete restaurant'})
    
}