import React from "react";
import RestaurantsListPage from "./Pages/RestaurantsListPage/RestaurantsListPage";
import Header from "./Components/Header/Header";
import RestaurantDetailsPage from "./Pages/RestaurantDetailsPage/RestaurantDetailsPage";
import RestaurantsGetLocation from "./Pages/RestaurantsGetLocation/RestaurantsGetLocation";
import RestaurantDishesPage from "./Pages/RestaurantDishesPage/RestaurantDishesPage";
import CartPage from "./Pages/CartPage/CartPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PasswordChangePage from "./Pages/PasswordChangePage/PasswordChange";
import DeliveryPage from "./Pages/DeliveryPage/DeliveryPage";
import PaymentMethodPage from "./Pages/PaymentMethodPage/PaymentMethodPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage/PlaceOrderPage";
import OwnedRestaurants from "./Pages/OwnedRestaurants/OwnedRestaurants";
import RestaurantDishesList from "./Pages/RestaurantDishesList/RestaurantsDishesList";
import OrderPage from "./Pages/OrderPage/OrderPage";
import DishEditPage from "./Pages/DishEditPage/DishEditPage";
import OrderListPage from "./Pages/OrderListPage/OrderListPage";
import UserListPage from "./Pages/UserListPage/UserListPage";
import UserEditPage from "./Pages/UserEditPage/UserEditPage";
import AdminOrderList from "./Pages/AdminOrderList/AdminOrderList";
import RestaurantsPage from "./Pages/RestaurantsPage/RestaurantsPage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import RestaurantUpdatePage from './Pages/RestaurantUpdatePage/RestaurantUpdatePage'
import AdminRestaurantListPage from './Pages/AdminRestaurantList/AdminRestaurantListPage'
import OwnerRestaurantListPage from './Pages/OwnerRestaurantList/OwnerRestaurantListPage'
import ForgotPasswordPage from './Pages/ForgotPasswordPage/ForgotPasswordPage'
import ResetPasswordPage from './Pages/ResetPasswordPage/ResetPasswordPage'
//import react-router-dom for routing
import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Header />

      <Route
        component={RestaurantsGetLocation}
        path="/restaurants/location/:zipcode/:distance"
      />
      <Route component={RestaurantDetailsPage} path="/restaurants/:id" exact />
      <Route
        component={RestaurantDishesPage}
        path="/restaurants/:id/dishes"
        exact
      />
      <Route component={CartPage} path="/cart/:id?" />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={ProfilePage} path="/profile" />
      <Route component={AboutPage} path="/about" />
      <Route component={PasswordChangePage} path="/passwordchange" />
      <Route component={DeliveryPage} path="/delivery" />
      <Route component={OrderListPage} path="/orders/:id?" />
      <Route component={PaymentMethodPage} path="/payment" />
      <Route component={RestaurantsPage} path="/restaurants" exact />
      <Route component={PlaceOrderPage} path="/placeorder" />
      <Route component={ForgotPasswordPage} path="/forgotpassword" />
      <Route component={UserListPage} path="/admin/userlist" />
      <Route component={AdminRestaurantListPage} path="/admin/restaurantlist" />
      <Route component={OwnerRestaurantListPage} path="/owner/restaurantlist/:id"/>
      <Route component={AdminOrderList} path="/admin/orderlist" />
      <Route component={OrderPage} path="/order/:id" />
      <Route component={ResetPasswordPage} path="/resetpassword/:id" />
      <Route component={OwnedRestaurants} path="/owner/restaurants/:id" />

      <Route
        component={RestaurantDishesList}
        path="/restaurants/:restaurantId/dishes/list"
      />
      <Route component={DishEditPage} path="/dishes/:dishId/edit" exact/>
      <Route component={UserEditPage} path="/admin/users/:userId/edit" />
      <Route component={RestaurantsListPage} path="/" exact />
      <Route component={RestaurantUpdatePage} path="/restaurants/:restaurantId/edit" />
    </Router>
  );
};
export default App;
