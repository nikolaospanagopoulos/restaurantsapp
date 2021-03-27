import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import Message from "../../Components/Message/Message";
import { Link } from "react-router-dom";
import "./PlaceOrderPage.css";
const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  //CALCULATE PRICES
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.taxPrice);
  const placeOrderHandler = () => {};
  return (
    <div className="order-info-page">
      <h1 className="delivery-payment-order-titles">Place Order</h1>
      <div className="checkout-steps">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className="order-info-container">
        <div>
          <h2>Delivery</h2>
          <p>
            <strong>Address:</strong>
            {cart.deliveryAddress.address}, {cart.deliveryAddress.city},{" "}
            {cart.deliveryAddress.postalCode},
          </p>
        </div>
        <div>
          <h2>Payment Method</h2>
          <strong>Method:</strong>
          {cart.paymentMethod}
        </div>
      </div>
      <h2 className="delivery-payment-order-titles">Order Items</h2>
      <div>
        {cart.cartItems.length === 0 ? (
          <Message>Your Cart Is Empty</Message>
        ) : (
          <div className="order-items-info">
            {cart.cartItems.map((item, index) => {
              return (
                <div key={index} className="order-items-info-container">
                  <div className="order-info-card">
                    <img src={item.image} alt={item.name} />
                    <Link
                      to={`/restaurants/${item.restaurant._id}/dishes`}
                      className="dish-restaurant-link"
                    >
                      <h5>{item.name} </h5>
                    </Link>
                    <h5>
                      {item.qty}x{item.price} = €{item.qty * item.price}
                    </h5>
                  </div>
                  <div></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="sum-container">
        <div>
          <h2>Your Sum</h2>

          <h4>Price: {cart.itemsPrice}€</h4>
          <h4>Tax: {cart.taxPrice}€</h4>
          <h4>Total: {cart.totalPrice}€</h4>

          <button
            onClick={() => placeOrderHandler}
            disabled={cart.cartItems === 0}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
