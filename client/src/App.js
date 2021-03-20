import React from "react";
import RestaurantsListPage from './Pages/RestaurantsListPage/RestaurantsListPage';
import Header from "./Components/Header/Header";
import RestaurantDetailsPage from './Pages/RestaurantDetailsPage/RestaurantDetailsPage'
import RestaurantsGetLocation from './Pages/RestaurantsGetLocation/RestaurantsGetLocation'
import RestaurantDishesPage from './Pages/RestaurantDishesPage/RestaurantDishesPage'
import CartPage from './Pages/CartPage/CartPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
//import react-router-dom for routing
import { BrowserRouter as Router,Route } from "react-router-dom";
const App = () => {
  return (
    <Router>

        <Header />
        
        <Route component={RestaurantsGetLocation} path='/restaurants/location/:zipcode/:distance' />
        <Route component={RestaurantDetailsPage} path='/restaurants/:id' exact/>
        <Route  component={RestaurantDishesPage} path='/restaurants/:id/dishes'/>
        <Route  component={CartPage} path='/cart/:id?'/>
        <Route  component={LoginPage} path='/login'/>
        <Route  component={RegisterPage} path='/register'/>
        <Route component={RestaurantsListPage} path='/' exact/>
       
    </Router>
  );
};
export default App;
