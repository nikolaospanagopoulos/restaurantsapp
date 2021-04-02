import React from "react";
import RestaurantsListPage from './Pages/RestaurantsListPage/RestaurantsListPage';
import Header from "./Components/Header/Header";
import RestaurantDetailsPage from './Pages/RestaurantDetailsPage/RestaurantDetailsPage'
import RestaurantsGetLocation from './Pages/RestaurantsGetLocation/RestaurantsGetLocation'
import RestaurantDishesPage from './Pages/RestaurantDishesPage/RestaurantDishesPage'
import CartPage from './Pages/CartPage/CartPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import PasswordChangePage from './Pages/PasswordChangePage/PasswordChange'
import DeliveryPage from './Pages/DeliveryPage/DeliveryPage'
import PaymentMethodPage from './Pages/PaymentMethodPage/PaymentMethodPage'
import PlaceOrderPage from './Pages/PlaceOrderPage/PlaceOrderPage'
import OwnedRestaurants from './Pages/OwnedRestaurants/OwnedRestaurants'
import RestaurantDishesList from './Pages/RestaurantDishesList/RestaurantsDishesList'
import OrderPage from './Pages/OrderPage/OrderPage'
//import react-router-dom for routing
import { BrowserRouter as Router,Route } from "react-router-dom";
const App = () => {
  return (
    <Router>

        <Header />
        
        <Route component={RestaurantsGetLocation} path='/restaurants/location/:zipcode/:distance' />
        <Route component={RestaurantDetailsPage} path='/restaurants/:id' exact/>
        <Route  component={RestaurantDishesPage} path='/restaurants/:id/dishes' exact/>
        <Route  component={CartPage} path='/cart/:id?'/>
        <Route  component={LoginPage} path='/login'/>
        <Route  component={RegisterPage} path='/register'/>
        <Route  component={ProfilePage} path='/profile'/>
        <Route  component={PasswordChangePage} path='/passwordchange'/>
        <Route  component={DeliveryPage} path='/delivery'/>
        <Route  component={PaymentMethodPage} path='/payment'/>
        <Route  component={PlaceOrderPage} path='/placeorder'/>
        <Route  component={OrderPage} path='/order/:id'/>
        <Route  component={OwnedRestaurants} path='/owner/restaurants/:id'/>
        <Route  component={RestaurantDishesList} path='/restaurants/:restaurantId/dishes/list' />

        <Route component={RestaurantsListPage} path='/' exact/>
       
    </Router>
  );
};
export default App;
