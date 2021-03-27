import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import { Link } from "react-router-dom";
import { getOrderDetailsAction } from "../../Actions/OrderActions/OrderDetailsActions";
import "./OrderPage.css";

const OrderPage = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  useEffect(() => {
    if(!order || order._id !== orderId){
      dispatch(getOrderDetailsAction(orderId));
    }
    
  }, [dispatch,order,orderId]);

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    //CALCULATE PRICES
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message> {error} </Message>
  ) : (
    <div className="order-info-page">
      <h1 className="delivery-payment-order-titles">Place Order</h1>

      <div className="order-info-container">
        <div>
          <h2>Delivery</h2>
          <p>
            <strong>Address:</strong>
            {order.deliveryAddress.address}, {order.deliveryAddress.city},{" "}
            {order.deliveryAddress.postalCode},
          </p>
        </div>
        <div>
          <h2>Payment Method</h2>
          <strong>Method:</strong>
          {order.paymentMethod}
        </div>
      </div>
      {order.isPaid ? (
        <Message color="green"> order got paid at {order.paidAt} </Message>
      ) : (
        <Message> Not Paid </Message>
      )}
      {order.isDelivered ? (
        <Message color="green">
          {" "}
          order was delivered at {order.deliveredAt}{" "}
        </Message>
      ) : (
        <Message> Not Yet Delivered </Message>
      )}
      <div className="order-user-info">
        <h2>User</h2>
        <strong>Name:</strong>
        {order.user.name}
        <br />
        <strong>Email:</strong>
        <a href={`mailto:${order.user.email}`}>{order.user.email} </a>
      </div>
      <h2 className="delivery-payment-order-titles">Order Items</h2>
      <div>
        {order.orderItems.length === 0 ? (
          <Message>Your Cart Is Empty</Message>
        ) : (
          <div className="order-items-info">
            {order.orderItems.map((item, index) => {
              return (
                <div key={index} className="order-items-info-container">
                  <div className="order-info-card">
                    <img src={item.image} alt={item.name} />
                    {/* <Link
                      to={`/restaurants/${item.restaurant._id}/dishes`}
                      className="dish-restaurant-link"
                    >
                      <h5>{item.name} </h5>
                    </Link> */}
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

          <h4>Price: {order.itemsPrice}€</h4>
          <h4>Tax: {order.taxPrice}€</h4>
          <h4>Total: {order.totalPrice}€</h4>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
