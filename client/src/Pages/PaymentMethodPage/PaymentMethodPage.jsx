import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import {savePaymentMethod} from '../../Actions/CartActions/SavePaymentMethodAction'
const PaymentMethodPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { deliveryAddress } = cart;
  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  if (!deliveryAddress) {
    history.push("/delivery");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  };
  return (
    <div>
      <h1 className='delivery-payment-order-titles'>Payment</h1>
      <div className="checkout-steps">
        <CheckoutSteps step1 step2 step3 />
      </div>

      <div className="form-container">
        <form onSubmit={submitHandler}>
          <label>PayPal</label>
          <input
            type="radio"
            id="PayPal"
            value={paymentMethod}
            name="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
