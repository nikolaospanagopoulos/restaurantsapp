import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message/Message";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
} from "../../Actions/CartActions/CartActions";
import "./CartPage.css";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;

  //get qty from url
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  

  const checkoutHandler = () => {
    history.push("/login?redirect=delivery");
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };
  return (
    <div className="cart-item-page">
      <div>
        <h1>Shopping Cart</h1>
        <div className="item-price-info">
          <div>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            <h3>
              €
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </h3>
          </div>
        </div>
        <div>
          <button
            type="button"
            className={`${
              cartItems.length > 0 ? "toCheckout" : "tocheckout-disabled"
            }`}
            onClick={checkoutHandler}
          >
            To Checkout
          </button>
        </div>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart Is Empty{" "}
            <Link className="go-back-link" to="/">
              Go Back
            </Link>
          </Message>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.product} className="cart-item">
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-product-image"
                  />
                </div>
                <div>
                  <Link
                    to={`/restaurants/${item.restaurant._id}/dishes`}
                    className="dish-restaurant-link"
                  >
                    {" "}
                    {item.name}{" "}
                  </Link>
                </div>
                <div className="cart-item-price">{item.price}€</div>
                <div>
                  <div>
                    <select
                      className="select-qty"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.available).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cartItem-select-remove">
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
