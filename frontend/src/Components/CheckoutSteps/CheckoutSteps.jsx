import React from "react";
import { Link } from "react-router-dom";
import './CheckoutSteps.css'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='checkoutlinks-container'>
      <div >
        {step1 ? (
          <div>
            <Link to="/login" className='active-link'>Sign In</Link>
          </div>
        ) : (
          <div>
            <Link disabled to='/' className='disabled-link'>Sign In</Link>
          </div>
        )}
      </div>
      <div>
        {step2 ? (
          <div>
            <Link to="/delivery" className='active-link'>Delivery</Link>
          </div>
        ) : (
          <div>
            <Link disabled className='disabled-link'>Delivery</Link>
          </div>
        )}
      </div>
      <div>
        {step3 ? (
          <div>
            <Link to="/payment" className='active-link'>Payment</Link>
          </div>
        ) : (
          <div>
            <Link disabled className='disabled-link'>Payment</Link>
          </div>
        )}
      </div>
      <div>
        {step4 ? (
          <div>
            <Link to="/placeorder" className='active-link'>Place Order</Link>
          </div>
        ) : (
          <div>
            <Link disabled className='disabled-link'>Place Order</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
