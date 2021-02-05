import React from "react";
import RestaurantsListPage from './Pages/RestaurantsListPage/RestaurantsListPage';
import Header from "./Components/Header/Header";
import RestaurantDetailsPage from './Pages/RestaurantDetailsPage/RestaurantDetailsPage'
import RestaurantsGetLocation from './Pages/RestaurantsGetLocation/RestaurantsGetLocation'
//import react-router-dom for routing
import { BrowserRouter as Router,Route } from "react-router-dom";
const App = () => {
  return (
    <Router>

        <Header />
        <Route component={RestaurantsGetLocation} path='/restaurants/location/:zipcode/:distance' />
        <Route component={RestaurantDetailsPage} path='/restaurants/:id' exact/>
        <Route component={RestaurantsListPage} path='/' exact/>
       
    </Router>
  );
};
export default App;
