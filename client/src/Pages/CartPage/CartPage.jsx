import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message/Message";
import { Link } from "react-router-dom";
import { addToCart } from "../../Actions/CartActions/CartActions";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;

  //get qty from url
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return <div></div>;
};

export default CartPage;
