import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//import reducers
import { RestaurantListReducer } from "./Reducers/RestaurantReducers/RestaurantListReducers";
import { restaurantDetailsReducer } from "./Reducers/RestaurantReducers/RestaurantDetailsReducers";
import { restaurantLocationReducer } from "./Reducers/RestaurantReducers/RestaurantGeolocationReducer";
import { GetRestaurantDishesReducer } from "./Reducers/DishesReducers/GetRestaurantDishesReducer";
import { loginReducer } from "./Reducers/UserReducers/LoginReducers";
import { loginInfoReducer } from "./Reducers/UserReducers/GetLogedInUserReducer";
import { registerReducer } from "./Reducers/UserReducers/RegisterReducers";
import { updateUserDetailsReducer } from "./Reducers/UserReducers/updateUserDetailsReducers";
import { updateUserPasswordReducer } from "./Reducers/UserReducers/updateUserDetailsReducers";
import { cartReducer } from "./Reducers/CartReducers/CartReducers";
import { orderCreateReducer } from "./Reducers/OrderReducers/OrderCreateReducers";
import { orderDetailsReducer } from "./Reducers/OrderReducers/OrderDetailsReducers";
import { orderPayReducer } from "./Reducers/OrderReducers/OrderPayReducer";
import { dishDeleteReducer } from "./Reducers/DishesReducers/DishDeleteReducer";
import { dishCreateReducer } from "./Reducers/DishesReducers/DishCreateReducer";
import { dishDetailsReducer } from "./Reducers/DishesReducers/DishDetailsReducer";
import { dishUpdateReducer } from "./Reducers/DishesReducers/DishUpdateReducer";
import { getOrdersReducer } from "./Reducers/OrderReducers/OrderListReducer";
import { getUsersReducer } from "./Reducers/UserReducers/GetUsersListReducer";
import { deleteUserReducer } from "./Reducers/UserReducers/UserDeleteReducers";
import { getUserReducer } from "./Reducers/UserReducers/GetUserReducer";
const reducer = combineReducers({
  restaurantList: RestaurantListReducer,
  restaurantDetails: restaurantDetailsReducer,
  restaurantLocation: restaurantLocationReducer,
  restaurantDishes: GetRestaurantDishesReducer,
  loginInfo: loginInfoReducer,
  cart: cartReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  userUpdate: updateUserDetailsReducer,
  passwordUpdate: updateUserPasswordReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  dishDelete: dishDeleteReducer,
  dishCreate: dishCreateReducer,
  dishDetails: dishDetailsReducer,
  dishUpdate: dishUpdateReducer,
  orderList: getOrdersReducer,
  userList: getUsersReducer,
  userDelete: deleteUserReducer,
  userDetails: getUserReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const deliveryAddressFromStorage = localStorage.getItem("deliveryAddress")
  ? JSON.parse(localStorage.getItem("deliveryAddress"))
  : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    deliveryAddress: deliveryAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
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
