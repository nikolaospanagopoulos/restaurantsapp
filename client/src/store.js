import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//import reducers
import {RestaurantListReducer} from './Reducers/RestaurantReducers/RestaurantListReducers'


const reducer = combineReducers({
    restaurantList:RestaurantListReducer
});

const initialState = {};

//we use thunk for asynchronous requests
const middleware = [thunk];


//we use compose with devtools so that we can use it in the browser
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
