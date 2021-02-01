import React from "react";
import RestaurantsListPage from './Pages/RestaurantsListPage/RestaurantsListPage';
import Header from "./Components/Header/Header";
import RestaurantDetailsPage from './Pages/RestaurantDetailsPage/RestaurantDetailsPage'
//import react-router-dom for routing
import { BrowserRouter as Router,Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
    
        <Header />
        <Route component={RestaurantDetailsPage} path='/restaurants/restaurant/:id' />
        <Route component={RestaurantsListPage} path='/' exact/>
      
    </Router>
  );
};
export default App;
