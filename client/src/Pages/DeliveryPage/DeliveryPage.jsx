import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../Actions/CartActions/SaveDeliveryAddressAction";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import "./DeliveryPage.css";

const DeliveryPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { deliveryAddress } = cart;

  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [postalCode, setPostalCode] = useState(deliveryAddress.postalCode);

  const dispatch = useDispatch();

  const loginInfo = useSelector((state) => state.loginInfo);
  const { success } = loginInfo;

  
  useEffect(() => {
    if (!success) {
      history.push("/login");
    }
  }, [success, history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
      })
    );
    history.push("/payment");
  };
  return (
    <div>
      <h1 className='delivery-payment-order-titles'>Delivery</h1>
      <div className='checkout-steps'>
      <CheckoutSteps step1 step2/>
      </div>
     
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <label>Your Address</label>
          <input
            type="text"
            placeholder="Your Address..."
            className="input-login-register"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label>Your City</label>
          <input
            type="text"
            placeholder="Your City..."
            className="input-login-register"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <label>Your Postal Code</label>
          <input
            type="text" 
            placeholder="Your Postal Code..."
            className="input-login-register"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryPage;
