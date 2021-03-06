import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//import reducers
import { RestaurantListReducer } from "./Reducers/RestaurantReducers/RestaurantListReducers";
import { restaurantDetailsReducer } from "./Reducers/RestaurantReducers/RestaurantDetailsReducers";
import { restaurantLocationReducer } from "./Reducers/RestaurantReducers/RestaurantGeolocationReducer";
import { GetRestaurantDishesReducer } from "./Reducers/DishesReducers/GetRestaurantDishesReducer";
import { cartReducer } from "./Reducers/CartReducers/CartReducers"
const reducer = combineReducers({
  restaurantList: RestaurantListReducer,
  restaurantDetails: restaurantDetailsReducer,
  restaurantLocation: restaurantLocationReducer,
  restaurantDishes: GetRestaurantDishesReducer,
  cart: cartReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
  (localStorage.getItem('cartItems')) : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage }
};

//we use thunk for asynchronous requests
const middleware = [thunk];

//we use compose with devtools so that we can use it in the browser
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
